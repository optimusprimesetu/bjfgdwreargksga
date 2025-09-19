class SPASystem {
    constructor() {
        this.currentPage = 'index';
        this.pages = {};
        this.init();
    }
    
    init() {
        this.definePages();
        this.loadCurrentPage();
        this.updateURL();
        // Setup navigation after DOM is ready
        setTimeout(() => this.updateNavigation(), 100);
    }
    
    definePages() {
        this.pages = {
            index: {
                title: 'Home - My Website',
                header: {
                    title: 'My Website',
                    subtitle: 'Introduction'
                },
                content: `
                    <section>
                        <h2>About Me</h2>
                        <p>Hello! I'm Myroslav, a second-year computing student at SETU.  
                        I'm interested in how technology can shape the way people live, study, and connect with each other.  
                        For me, computing isn't just about solving problems — it's about asking better questions and exploring how ideas can turn into something real.</p>

                        <p>What I do:</p>
                        <ul>
                            <li>Study cybersecurity and how we can make systems safer</li>
                            <li>Experiment with artificial intelligence and creative uses of it</li>
                            <li>Work on a student campus app to bring people together more easily</li>
                            <li>Collaborate and make new friends along the way</li>
                            <li>Take on projects that might look a bit ambitious at first (but that's part of the fun)</li>
                        </ul>

                        <p>Things I like:</p>
                        <ol>
                            <li>Starting projects from scratch and watching them grow</li>
                            <li>Exploring new programming tools and frameworks</li>
                            <li>Playing strategy games like Civilization (and sometimes overthinking them)</li>
                            <li>Reading about new trends in technology and imagining what's next</li>
                            <li>Coming up with ideas that could help people connect in meaningful ways</li>
                        </ol>

                        <p>Things I dislike:</p>
                        <ol>
                            <li>Code without proper documentation or comments</li>
                            <li>Websites that take forever to load</li>
                            <li>When technology becomes a barrier instead of a bridge</li>
                            <li>Spam emails and aggressive marketing tactics</li>
                            <li>Giving up on a project just because it gets challenging</li>
                        </ol>
                    </section>
                `,
                footer: {
                    email: 'C00307847@SETU.ie',
                    link: { url: 'https://www.w3schools.com', text: 'W3Schools' }
                }
            },
            
            hobby: {
                title: 'Hobby - My Website',
                header: {
                    title: 'My Hobby',
                    subtitle: 'Turning curiosity into projects'
                },
                content: `
                    <section>
                        <h2>Why coding is my main hobby</h2>
                        <p>For me, coding feels less like "work" and more like building with Lego blocks.  
                        Every project starts with a blank screen, and slowly it takes shape into something useful or fun.  
                        What I enjoy most is that the rules are strict (the code has to run), but the possibilities are endless.</p>

                        <p>I often dive into side projects just to see how far I can push an idea.  
                        Sometimes they stay small experiments, and sometimes they grow into something bigger — like my student app project.  
                        Either way, I always come out of it learning something new. You can read more about my learning approach in my <a href="#" onclick="spa.navigateTo('school'); return false;">school experience</a>.</p>
                        
                        <h3>Creative Experiments</h3>
                        <p>I also enjoy experimenting with technology in unusual ways. Here's a scan of my hand I made using a printer scanner - exploring the intersection of analog and digital!</p>
                        <img src="hand-scan.jpg" alt="Hand scan experiment" class="content-image">
                        <p>This represents how I approach coding - hands-on learning and creative problem solving. Sometimes the most interesting discoveries come from trying something unexpected.</p>
                    </section>
                `,
                footer: {
                    email: 'C00307847@SETU.ie',
                    link: { url: 'https://www.codecademy.com', text: 'CodeAcademy' }
                }
            },
            
            school: {
                title: 'School - My Website',
                header: {
                    title: 'School Life',
                    subtitle: 'Studying Computing at SETU'
                },
                content: `
                    <section>
                        <h2>My experience</h2>
                        <p>Being a computing student at SETU means constantly switching between theory and practice.  
                        One moment we're learning how systems work under the hood, and the next we're challenged to build something ourselves.  
                        I like this balance because it keeps me on my toes.</p>

                        <p>I especially enjoy working on web development assignments because they feel immediately real.  
                        A few lines of code, and suddenly you can click around, interact, and see results.  
                        That instant feedback makes learning more exciting for me.</p>
                        
                        <h3>Computing Inspiration</h3>
                        <p>Computing has always fascinated me. Here's a tribute I built in Minecraft - a pixelated portrait of Steve Jobs, one of the pioneers who made computing accessible to everyone.</p>
                        <img src="steve-jobs.jpg" alt="Steve Jobs built in Minecraft" class="content-image">
                        <p>This project combines my love for gaming, creativity, and respect for computing history. Building pixel art helps me think about digital design and problem-solving in a visual way.</p>
                    </section>
                `,
                footer: {
                    email: 'C00307847@SETU.ie',
                    link: { url: 'https://www.setu.ie', text: 'SETU' }
                }
            },
            
            holidays: {
                title: 'Holidays - My Website',
                header: {
                    title: 'Holidays',
                    subtitle: 'Time to reset and recharge'
                },
                content: `
                    <section>
                        <h2>How I spend breaks</h2>
                        <p>Holidays are when I step back, breathe, and let new ideas in.  
                        Sometimes I use the time to explore new technologies or read about trends I don't get to cover during classes.  
                        Other times, I completely unplug and play strategy games with friends.</p>

                        <p>Either way, I see holidays as an important reset.  
                        They remind me that balance is key: the better I recharge, the more energy I have to bring into my <a href="#" onclick="spa.navigateTo('hobby'); return false;">projects</a> and <a href="#" onclick="spa.navigateTo('school'); return false;">studies</a>.</p>
                    </section>
                `,
                footer: {
                    email: 'C00307847@SETU.ie',
                    link: { url: 'https://www.lonelyplanet.com', text: 'Travel Info' }
                }
            }
        };
    }
    
    
    navigateTo(pageName) {
        console.log('navigateTo called with:', pageName);
        if (this.pages[pageName]) {
            console.log('Page found, switching to:', pageName);
            this.currentPage = pageName;
            this.loadCurrentPage();
            this.updateURL();
            this.updateNavigation();
        } else {
            console.error('Page not found:', pageName, 'Available pages:', Object.keys(this.pages));
        }
    }
    
    loadCurrentPage() {
        console.log('loadCurrentPage called for:', this.currentPage);
        const page = this.pages[this.currentPage];
        
        if (!page) {
            console.error('Page data not found for:', this.currentPage);
            return;
        }
        
        // Update document title
        document.title = page.title;
        console.log('Title updated to:', page.title);
        
        // Update header
        const headerTitle = document.querySelector('header h1');
        const headerSubtitle = document.querySelector('header p');
        
        console.log('Header elements found:', !!headerTitle, !!headerSubtitle);
        
        if (headerTitle) headerTitle.textContent = page.header.title;
        if (headerSubtitle) {
            if (page.header.subtitle) {
                headerSubtitle.textContent = page.header.subtitle;
                headerSubtitle.style.display = 'block';
            } else {
                headerSubtitle.style.display = 'none';
            }
        }
        
        // Update main content (the content row is the 3rd tr in the table)
        const contentArea = document.querySelector('table tr:nth-child(3) td');
        console.log('Content area found:', !!contentArea);
        if (contentArea) {
            contentArea.innerHTML = page.content;
            console.log('Content updated');
        } else {
            // Fallback - try to find by content structure
            const allRows = document.querySelectorAll('table tr');
            console.log('Total table rows found:', allRows.length);
            if (allRows.length >= 3) {
                const contentRow = allRows[2]; // 0-based index for 3rd row
                const contentCell = contentRow.querySelector('td');
                if (contentCell) {
                    contentCell.innerHTML = page.content;
                    console.log('Content updated via fallback method');
                }
            }
        }
        
        // Update footer
        const footer = document.querySelector('.footer');
        console.log('Footer found:', !!footer);
        if (footer) {
            footer.innerHTML = `
                <p>Contact: <a href="mailto:${page.footer.email}">${page.footer.email}</a></p>
                <p>External link: <a href="${page.footer.link.url}" target="_blank">${page.footer.link.text}</a></p>
            `;
            console.log('Footer updated');
        }
    }
    
    updateURL() {
        // Update URL without page reload (only if not using file:// protocol)
        if (location.protocol !== 'file:') {
            const newURL = this.currentPage === 'index' ? '/' : `/${this.currentPage}`;
            history.pushState({ page: this.currentPage }, '', newURL);
        } else {
            console.log('File protocol detected, skipping URL update');
        }
    }
    
    updateNavigation() {
        // Update active navigation state
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            const onclick = link.getAttribute('onclick');
            if (onclick && onclick.includes(`'${this.currentPage}'`)) {
                link.style.fontWeight = 'bold';
                link.style.color = '#007AFF';
            } else {
                link.style.fontWeight = 'normal';
                link.style.color = 'black';
            }
        });
    }
    
    // Handle browser back/forward buttons
    handlePopState(event) {
        if (event.state && event.state.page) {
            this.currentPage = event.state.page;
            this.loadCurrentPage();
            this.updateNavigation();
        }
    }
}

// Initialize SPA system when page loads
let spa;

// Create a temporary spa object that will queue navigation calls
window.spa = {
    navigateTo: function(page) {
        console.log('Navigation queued for:', page);
        if (window.realSpa) {
            window.realSpa.navigateTo(page);
        } else {
            // Queue the navigation call for when SPA is ready
            setTimeout(() => {
                if (window.realSpa) {
                    window.realSpa.navigateTo(page);
                } else {
                    console.error('SPA system not ready after timeout');
                }
            }, 100);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing SPA system...');
    spa = new SPASystem();
    
    // Make real spa globally available
    window.realSpa = spa;
    window.spa.navigateTo = spa.navigateTo.bind(spa);
    
    // Handle browser navigation
    window.addEventListener('popstate', (event) => {
        spa.handlePopState(event);
    });
    
    console.log('SPA system ready, spa object:', spa);
});
