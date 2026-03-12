 const startBtn = document.getElementById('start-btn');
        const startScreen = document.getElementById('start-screen');
        const hackerScreen = document.getElementById('hacker-screen');
        const camPop = document.getElementById('cam-pop');
        const consoleDiv = document.getElementById('console');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const prankReveal = document.getElementById('prank-reveal');

        let floodInterval;
        let userData = { ip: "Tracing...", city: "Unknown", org: "Unknown" };
        
        // Setup the new alarm sound from Mixkit
        const alarmSound = new Audio('https://assets.mixkit.co/active_storage/sfx/995/995-preview.mp3');
        alarmSound.loop = true; // Make the siren loop continuously

        // Fetch Real IP Data
        async function fetchIPData() {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                userData.ip = data.ip;
                userData.city = data.city + ", " + data.region;
                userData.org = data.org;
            } catch (e) {
                userData.ip = "192.168.1." + Math.floor(Math.random() * 255);
            }
        }

        async function typeWriter(text) {
            let p = document.createElement('div');
            consoleDiv.appendChild(p);
            for (let i = 0; i < text.length; i++) {
                p.innerHTML += text.charAt(i);
                await new Promise(r => setTimeout(r, 10));
            }
            consoleDiv.scrollTop = consoleDiv.scrollHeight;
        }

        startBtn.addEventListener('click', async () => {
            // Trigger Camera/Mic prompt immediately
            try {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .catch(() => {});
            } catch (e) {}
            // Pre-fetch IP data so it's ready when the terminal starts
            fetchIPData();

            document.body.classList.add('glitch-anim');
            
            setTimeout(() => {
                document.body.classList.remove('glitch-anim');
                if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
                
                startScreen.style.display = 'none';
                hackerScreen.style.display = 'block';

                // Play the MP3 alarm sound
                alarmSound.play().catch(e => console.log("Audio play blocked by browser:", e));

                setTimeout(() => { camPop.style.display = 'block'; }, 4000);
                

                (async function runLogs() {
                    const logs = [
                        "> Initializing RAT payload...",
                        "> TARGET IP IDENTIFIED: " + userData.ip,
                        "> GEOLOCATION: " + userData.city,
                        "> ISP DETECTED: " + userData.org,
                        "> Connection established via node 45.22.1.09",
                        "> Escalating privileges to SYSTEM/ROOT...",
                        "> ACCESS GRANTED.",
                        "> Scanning for private crypto keys...",
                        "> Indexing C:/Users/Documents...",
                        "> Found 1,402 sensitive files.",
                        "> Activating remote webcam feed...",
                        "> UPLOADING SYSTEM_DUMP TO ENCRYPTED SERVER..."
                    ];

                    for (const log of logs) {
                        await typeWriter(log);
                        await new Promise(r => setTimeout(r, 600));
                    }
                    
                    // Endless data flood
                    floodInterval = setInterval(() => {
                        let div = document.createElement('div');
                        div.style.fontSize = "12px";
                        div.innerText = "> [EXFIL] " + Math.random().toString(36).substring(2, 15) + " >> 0x" + Math.random().toString(16).slice(2, 8).toUpperCase();
                        consoleDiv.appendChild(div);
                        consoleDiv.scrollTop = consoleDiv.scrollHeight;
                    }, 50);
                })();

                let progress = 0;
                const progInterval = setInterval(() => {
                    if (progress < 100) {
                        progress += 0.25;
                        progressBar.style.width = progress + "%";
                        progressText.innerText = "DUMPING SYSTEM_FILES: " + Math.floor(progress) + "%";
                    } else {
                        // PROGRESS REACHED 100%
                        clearInterval(progInterval);
                        progressText.innerText = "DUMPING SYSTEM_FILES: 100% - COMPLETE";
                        
                        // Wait 1.5 seconds for dramatic effect, then reveal the prank
                        setTimeout(() => {
                            // Stop and reset the alarm sound
                            alarmSound.pause();
                            alarmSound.currentTime = 0;
                            
                            clearInterval(floodInterval); // Stop the text scroll
                            
                            hackerScreen.style.display = 'none'; // Hide the hacker screen
                            prankReveal.style.display = 'flex'; // Show the prank reveal
                            
                            // Exit full screen so they can easily close the tab
                            if (document.exitFullscreen) {
                                document.exitFullscreen().catch(()=> {});
                            }
                        }, 1500);
                    }
                }, 40);

            }, 600);
        });