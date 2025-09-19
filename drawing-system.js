class DrawingSystem {
    constructor() {
        this.isDrawing = false;
        this.currentPath = [];
        this.drawings = [];
        this.currentCanvas = null;
        this.currentContext = null;
        this.drawingMode = false;
        this.drawingId = 0;
        this.clickTimeout = null;
        this.clickDelay = 300; // 300ms debounce
        
        this.init();
        this.loadSavedDrawings();
    }
    
    init() {
        // Create add button
        const addBtn = document.createElement('button');
        addBtn.className = 'add-drawing-btn';
        addBtn.innerHTML = '+';
        addBtn.onclick = () => this.startDrawing();
        document.body.appendChild(addBtn);
        
        // Create drawing overlay
        const overlay = document.createElement('div');
        overlay.className = 'drawing-overlay';
        overlay.id = 'drawing-overlay';
        document.body.appendChild(overlay);
        
        // Add functionality to invisible cells
        this.setupInvisibleCells();
    }
    
    setupInvisibleCells() {
        const invisibleCells = document.querySelectorAll('.invisible-cell');
        invisibleCells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleInvisibleCellClick(e));
            cell.addEventListener('dblclick', (e) => this.handleInvisibleCellDoubleClick(e));
        });
    }
    
    handleInvisibleCellClick(e) {
        e.preventDefault();
        
        // Clear any existing timeout
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
        }
        
        // Set a timeout to handle single click
        this.clickTimeout = setTimeout(() => {
            this.startDrawing();
            this.clickTimeout = null;
        }, this.clickDelay);
    }
    
    handleInvisibleCellDoubleClick(e) {
        e.preventDefault();
        
        // Clear the single click timeout
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;
        }
        
        // Handle double click immediately
        this.clearAllDrawings();
    }
    
    clearAllDrawings() {
        if (confirm('Clear all drawings? This cannot be undone.')) {
            // Remove all drawing elements from DOM
            const savedDrawings = document.querySelectorAll('.saved-drawing');
            savedDrawings.forEach(drawing => drawing.remove());
            
            // Clear from storage
            localStorage.removeItem('drawings');
            this.drawings = [];
            
            console.log('All drawings cleared');
        }
    }
    
    startDrawing() {
        this.drawingMode = true;
        const overlay = document.getElementById('drawing-overlay');
        overlay.style.display = 'block';
        
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'drawing-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        this.currentCanvas = canvas;
        this.currentContext = ctx;
        this.currentPath = [];
        
        overlay.appendChild(canvas);
        
        // Add event listeners
        canvas.addEventListener('mousedown', (e) => this.startPath(e));
        canvas.addEventListener('mousemove', (e) => this.drawPath(e));
        canvas.addEventListener('mouseup', () => this.endPath());
        canvas.addEventListener('mouseleave', () => this.endPath());
        
        // Add touch support
        canvas.addEventListener('touchstart', (e) => this.startPath(e));
        canvas.addEventListener('touchmove', (e) => this.drawPath(e));
        canvas.addEventListener('touchend', () => this.endPath());
    }
    
    startPath(e) {
        this.isDrawing = true;
        const rect = this.currentCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        this.currentContext.beginPath();
        this.currentContext.moveTo(x, y);
        this.currentPath.push({x, y});
    }
    
    drawPath(e) {
        if (!this.isDrawing) return;
        
        e.preventDefault();
        const rect = this.currentCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        this.currentContext.lineTo(x, y);
        this.currentContext.stroke();
        this.currentPath.push({x, y});
    }
    
    endPath() {
        if (!this.isDrawing) return;
        this.isDrawing = false;
        
        if (this.currentPath.length > 5) {
            this.showControls();
        }
    }
    
    showControls() {
        const bounds = this.getDrawingBounds();
        
        const controls = document.createElement('div');
        controls.className = 'drawing-controls';
        controls.style.display = 'flex';
        controls.style.left = bounds.maxX + 10 + 'px';
        controls.style.top = bounds.minY + 'px';
        
        const okBtn = document.createElement('button');
        okBtn.className = 'control-btn ok-btn';
        okBtn.innerHTML = '✓';
        okBtn.onclick = () => this.saveDrawing();
        
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'control-btn cancel-btn';
        cancelBtn.innerHTML = '✕';
        cancelBtn.onclick = () => this.cancelDrawing();
        
        controls.appendChild(okBtn);
        controls.appendChild(cancelBtn);
        
        document.getElementById('drawing-overlay').appendChild(controls);
    }
    
    getDrawingBounds() {
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        this.currentPath.forEach(point => {
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
        });
        
        return {minX, minY, maxX, maxY};
    }
    
    async saveDrawing() {
        const bounds = this.getDrawingBounds();
        const padding = 10;
        
        // Create a new canvas with just the drawing
        const drawingCanvas = document.createElement('canvas');
        const width = bounds.maxX - bounds.minX + (padding * 2);
        const height = bounds.maxY - bounds.minY + (padding * 2);
        
        drawingCanvas.width = width;
        drawingCanvas.height = height;
        
        const drawingCtx = drawingCanvas.getContext('2d');
        drawingCtx.strokeStyle = '#2196F3';
        drawingCtx.lineWidth = 6;
        drawingCtx.lineCap = 'round';
        drawingCtx.lineJoin = 'round';
        
        // Redraw the path on the new canvas
        drawingCtx.beginPath();
        this.currentPath.forEach((point, index) => {
            const x = point.x - bounds.minX + padding;
            const y = point.y - bounds.minY + padding;
            
            if (index === 0) {
                drawingCtx.moveTo(x, y);
            } else {
                drawingCtx.lineTo(x, y);
            }
        });
        drawingCtx.stroke();
        
        // Convert to blob and save
        drawingCanvas.toBlob(async (blob) => {
            const drawingData = {
                id: this.drawingId++,
                x: bounds.minX,
                y: bounds.minY,
                width: width,
                height: height,
                blob: blob
            };
            
            this.drawings.push(drawingData);
            await this.saveDrawingToFile(drawingData);
            this.createDraggableDrawing(drawingData);
            this.cancelDrawing();
        });
    }
    
    async saveDrawingToFile(drawingData) {
        try {
            // Convert blob to base64 for localStorage
            const reader = new FileReader();
            reader.onload = () => {
                const base64Data = reader.result;
                
                // Save drawing with base64 data to localStorage
                const savedDrawings = JSON.parse(localStorage.getItem('drawings') || '[]');
                savedDrawings.push({
                    id: drawingData.id,
                    x: drawingData.x,
                    y: drawingData.y,
                    width: drawingData.width,
                    height: drawingData.height,
                    data: base64Data,
                    timestamp: Date.now()
                });
                localStorage.setItem('drawings', JSON.stringify(savedDrawings));
                console.log('Drawing saved to localStorage with ID:', drawingData.id);
            };
            reader.readAsDataURL(drawingData.blob);
            
        } catch (error) {
            console.error('Error saving drawing:', error);
        }
    }
    
    createDraggableDrawing(drawingData, fromStorage = false) {
        const img = document.createElement('img');
        img.className = 'saved-drawing';
        img.src = fromStorage ? drawingData.data : URL.createObjectURL(drawingData.blob);
        img.style.left = drawingData.x + 'px';
        img.style.top = drawingData.y + 'px';
        img.style.width = drawingData.width + 'px';
        img.style.height = drawingData.height + 'px';
        img.style.zIndex = '5';
        
        img.draggable = false; // Prevent default drag
        
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        img.addEventListener('mousedown', (e) => {
            isDragging = true;
            img.classList.add('dragging');
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(img.style.left);
            startTop = parseInt(img.style.top);
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            img.style.left = (startLeft + deltaX) + 'px';
            img.style.top = (startTop + deltaY) + 'px';
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                img.classList.remove('dragging');
                
                // Update drawing position in storage
                drawingData.x = parseInt(img.style.left);
                drawingData.y = parseInt(img.style.top);
                this.updateDrawingPosition(drawingData);
            }
        });
        
        // Double-click to delete
        img.addEventListener('dblclick', () => {
            if (confirm('Delete this drawing?')) {
                img.remove();
                this.deleteDrawing(drawingData.id);
            }
        });
        
        document.body.appendChild(img);
    }
    
    updateDrawingPosition(drawingData) {
        const savedDrawings = JSON.parse(localStorage.getItem('drawings') || '[]');
        const index = savedDrawings.findIndex(d => d.id === drawingData.id);
        if (index !== -1) {
            savedDrawings[index].x = drawingData.x;
            savedDrawings[index].y = drawingData.y;
            localStorage.setItem('drawings', JSON.stringify(savedDrawings));
        }
    }
    
    deleteDrawing(id) {
        this.drawings = this.drawings.filter(d => d.id !== id);
        const savedDrawings = JSON.parse(localStorage.getItem('drawings') || '[]');
        const filtered = savedDrawings.filter(d => d.id !== id);
        localStorage.setItem('drawings', JSON.stringify(filtered));
    }
    
    loadSavedDrawings() {
        const savedDrawings = JSON.parse(localStorage.getItem('drawings') || '[]');
        console.log('Loading saved drawings:', savedDrawings.length);
        
        savedDrawings.forEach(drawingData => {
            // Update the next drawing ID to avoid conflicts
            if (drawingData.id >= this.drawingId) {
                this.drawingId = drawingData.id + 1;
            }
            
            // Create draggable drawing from stored data
            this.createDraggableDrawing(drawingData, true);
        });
    }
    
    cancelDrawing() {
        const overlay = document.getElementById('drawing-overlay');
        overlay.style.display = 'none';
        overlay.innerHTML = '';
        this.drawingMode = false;
        this.currentCanvas = null;
        this.currentContext = null;
        this.currentPath = [];
    }
}

// Initialize the drawing system when page loads
document.addEventListener('DOMContentLoaded', () => {
    new DrawingSystem();
});
