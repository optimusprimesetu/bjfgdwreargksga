class MusicSystem {
    constructor() {
        this.audio = null;
        this.volume = 0.3; // Default volume (30%)
        this.currentTrack = 0;
        this.isPlaying = false;
        this.playlist = [
            {
                file: 'djkvbhwenojbhirgjnoiewjvhuirbgn;nnbwopeqghefknjbhler.mp3',
                title: 'Music',
                artist: 'U96'
            }
            // Add more tracks here if you have them
        ];
        
        this.init();
    }
    
    init() {
        // Create audio element
        this.loadCurrentTrack();
        
        // Create player interface
        this.createPlayer();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Auto-play music
        this.startMusic();
    }
    
    loadCurrentTrack() {
        const track = this.playlist[this.currentTrack];
        this.audio = new Audio(track.file);
        this.audio.loop = false; // We'll handle track progression
        this.audio.volume = this.volume;
    }
    
    createPlayer() {
        const player = document.createElement('div');
        player.className = 'music-player';
    
        // Track info inline
        const trackInfo = document.createElement('div');
        trackInfo.className = 'track-info';
        trackInfo.textContent = `${this.playlist[this.currentTrack].title}`;
    
        // Controls
        const controls = document.createElement('div');
        controls.className = 'player-controls';
    
        const playBtn = document.createElement('button');
        playBtn.className = 'control-btn play-btn';
        playBtn.textContent = 'Play';
        playBtn.onclick = () => this.togglePlayPause();
    
        controls.appendChild(playBtn);
    
        // Volume
        const volumeControl = document.createElement('div');
        volumeControl.className = 'volume-control';
    
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = '0';
        volumeSlider.max = '1';
        volumeSlider.step = '0.1';
        volumeSlider.value = this.volume;
        volumeSlider.className = 'volume-slider';
        volumeSlider.oninput = (e) => this.setVolume(e.target.value);
    
        volumeControl.appendChild(volumeSlider);
    
        // Inline layout
        player.appendChild(trackInfo);
        player.appendChild(controls);
        player.appendChild(volumeControl);
    
        document.body.appendChild(player);
    
        this.playBtn = playBtn;
        this.trackInfo = trackInfo;
    }
    
    
    
    startMusic() {
        // Try to start music (may require user interaction)
        this.play();
    }
    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.playBtn.textContent = 'Pause';
        }).catch(() => {
            document.addEventListener('click', () => {
                this.audio.play().then(() => {
                    this.isPlaying = true;
                    this.playBtn.textContent = 'Pause';
                });
            }, { once: true });
        });
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.playBtn.textContent = 'Play';
    }
    
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    previousTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        this.switchTrack();
    }
    
    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.switchTrack();
    }
    
    switchTrack() {
        const wasPlaying = this.isPlaying;
        this.audio.pause();
        this.loadCurrentTrack();
        this.updateTrackInfo();
        this.setupEventListeners();
        
        if (wasPlaying) {
            this.play();
        }
    }
    
    updateTrackInfo() {
        const track = this.playlist[this.currentTrack];
        this.trackTitle.textContent = track.title;
        this.trackArtist.textContent = track.artist;
    }
    
    setVolume(volume) {
        this.volume = parseFloat(volume);
        this.audio.volume = this.volume;
    }
    
    setupEventListeners() {
        // Handle audio loading
        this.audio.addEventListener('canplaythrough', () => {
            console.log('Music loaded and ready to play');
        });
        
        // Handle audio errors
        this.audio.addEventListener('error', (e) => {
            console.error('Music loading error:', e);
        });
        
        // Handle track ending
        this.audio.addEventListener('ended', () => {
            this.nextTrack();
        });
    }
    
    // Static method to ensure only one instance
    static getInstance() {
        if (!window.musicSystemInstance) {
            window.musicSystemInstance = new MusicSystem();
        }
        return window.musicSystemInstance;
    }
}

// Initialize music system when page loads
document.addEventListener('DOMContentLoaded', () => {
    MusicSystem.getInstance();
});
