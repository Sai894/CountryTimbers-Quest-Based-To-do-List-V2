// ====================================
// STATE MANAGEMENT
// ====================================

const appState = {
    heroName: "Brave Adventurer",
    level: 5,
    currentXP: 350,
    xpToNextLevel: 500,
    totalCompletedQuests: 12,
    currentStreak: 3,
    hasSpokenToQuestGiver: false,
    playerPos: { x: 150, y: 150 },
    facingDirection: 'down',
    questGiverPos: { x: 600, y: 300 },
    showInteractPrompt: false,
    keysPressed: new Set(),
    quests: [
        {
            id: 1,
            title: "Morning Meditation",
            description: "Start your day with 10 minutes of mindful breathing and centering.",
            difficulty: "Easy",
            xpReward: 50,
            completed: false
        },
        {
            id: 2,
            title: "Dragon's Workout Challenge",
            description: "Complete a 30-minute workout session to build strength and endurance.",
            difficulty: "Medium",
            xpReward: 100,
            completed: false
        },
        {
            id: 3,
            title: "Study Ancient Texts",
            description: "Dedicate 2 hours to learning and mastering new knowledge in your chosen field.",
            difficulty: "Hard",
            xpReward: 150,
            completed: false
        },
        {
            id: 4,
            title: "Help a Fellow Adventurer",
            description: "Reach out and assist someone in need today - spread kindness in the realm.",
            difficulty: "Easy",
            xpReward: 50,
            completed: false
        }
    ]
};

const motivationalQuotes = [
    "Every quest you complete makes you stronger, brave hero!",
    "The path to greatness is paved with completed tasks.",
    "Your dedication shines brighter than the northern star!",
    "Small victories today lead to legendary achievements tomorrow.",
    "Keep pushing forward, champion! Your potential is limitless!"
];

// ====================================
// UTILITY FUNCTIONS
// ====================================

function showToast(title, description, duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-description">${description}</div>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function calculateDistance(pos1, pos2) {
    return Math.sqrt(
        Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
    );
}

// ====================================
// RENDER FUNCTIONS
// ====================================

function renderUserSummary() {
    const container = document.getElementById('userSummary');
    const xpPercentage = (appState.currentXP / appState.xpToNextLevel) * 100;

    container.innerHTML = `
        <div class="user-summary-content">
            <div class="avatar-container">
                <div class="avatar">
                    <svg class="avatar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                <div class="level-badge">Lv${appState.level}</div>
            </div>
            <div class="hero-info">
                <div class="hero-name">
                    ${appState.heroName}
                    <span class="sparkle">✨</span>
                </div>
                <div class="xp-info">
                    <div class="xp-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        Experience Progress
                    </div>
                    <span class="xp-value">${appState.currentXP} / ${appState.xpToNextLevel} XP</span>
                </div>
                <div class="xp-bar-container">
                    <div class="xp-bar" style="width: ${xpPercentage}%"></div>
                    <div class="xp-bar-text">${Math.round(xpPercentage)}%</div>
                </div>
                <p class="xp-needed">
                    ${appState.xpToNextLevel - appState.currentXP} XP needed to reach Level ${appState.level + 1}
                </p>
            </div>
        </div>
    `;
}

function renderGameWorld() {
    const container = document.getElementById('gameWorld');
    
    // Create base structure if not exists
    if (!container.querySelector('.grass-pattern')) {
        container.innerHTML = `
            <div class="grass-pattern"></div>
            <div class="player">
                <div class="player-circle">
                    <div class="player-direction"></div>
                    <div class="player-eyes">
                        <div class="player-eye"></div>
                        <div class="player-eye"></div>
                    </div>
                </div>
            </div>
            <div class="quest-giver">
                <div class="quest-giver-circle">
                    <div class="quest-giver-hat"></div>
                    <div class="quest-giver-sparkle">✨</div>
                    <div class="quest-giver-staff"></div>
                    <div class="staff-orb"></div>
                </div>
                <div class="npc-label">Quest Giver</div>
            </div>
            <div class="controls-hint">Use WASD or Arrow Keys to move</div>
            <div class="compass">
                <div class="compass-inner">
                    <div class="compass-direction compass-n">N</div>
                    <div class="compass-direction compass-s">S</div>
                    <div class="compass-direction compass-w">W</div>
                    <div class="compass-direction compass-e">E</div>
                    <div class="compass-center"></div>
                </div>
            </div>
        `;
    }

    // Update player position
    const player = container.querySelector('.player');
    player.style.left = `${appState.playerPos.x - 20}px`;
    player.style.top = `${appState.playerPos.y - 20}px`;

    // Update player direction indicator
    const direction = container.querySelector('.player-direction');
    const positions = {
        up: { top: '2px', left: '50%', transform: 'translateX(-50%)' },
        down: { bottom: '2px', left: '50%', transform: 'translateX(-50%)' },
        left: { left: '2px', top: '50%', transform: 'translateY(-50%)' },
        right: { right: '2px', top: '50%', transform: 'translateY(-50%)' }
    };
    Object.assign(direction.style, positions[appState.facingDirection]);

    // Update quest giver position
    const questGiver = container.querySelector('.quest-giver');
    questGiver.style.left = `${appState.questGiverPos.x - 30}px`;
    questGiver.style.top = `${appState.questGiverPos.y - 30}px`;

    // Update interact prompt
    let interactPrompt = container.querySelector('.interact-prompt');
    if (appState.showInteractPrompt && !interactPrompt) {
        interactPrompt = document.createElement('div');
        interactPrompt.className = 'interact-prompt';
        interactPrompt.innerHTML = `
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: inline; vertical-align: middle; margin-right: 8px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span>Press [E] to talk</span>
        `;
        container.appendChild(interactPrompt);
    } else if (!appState.showInteractPrompt && interactPrompt) {
        interactPrompt.remove();
    }
}

function renderActiveQuests() {
    const container = document.getElementById('activeQuests');
    const allCompleted = appState.quests.every(q => q.completed);

    const questsHTML = appState.quests.map(quest => {
        const difficultyIcons = {
            Easy: '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
            Medium: '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
            Hard: '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg>'
        };

        return `
            <div class="quest-card ${quest.completed ? 'completed' : ''}" data-quest-id="${quest.id}">
                <div class="quest-content">
                    <div class="quest-details">
                        <div class="quest-title">
                            ${quest.title}
                            ${quest.completed ? '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' : ''}
                        </div>
                        <p class="quest-description">${quest.description}</p>
                        <div class="quest-badges">
                            <span class="badge badge-${quest.difficulty.toLowerCase()}">
                                ${difficultyIcons[quest.difficulty]}
                                ${quest.difficulty}
                            </span>
                            <span class="badge badge-xp">⚡ ${quest.xpReward} XP</span>
                        </div>
                    </div>
                    <button 
                        class="btn-complete" 
                        ${quest.completed ? 'disabled' : ''}
                        onclick="completeQuest(${quest.id})"
                    >
                        ${quest.completed ? '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: inline; margin-right: 8px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Completed' : 'Complete Quest'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="quests-header">
            <h2>
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Active Quests
            </h2>
            <p>Complete these tasks to earn XP and level up!</p>
        </div>
        <div class="quest-list">
            ${questsHTML}
        </div>
        ${allCompleted ? '<div class="all-complete-message">🎉 All quests completed! The Quest Giver will have new challenges for you soon! 🎉</div>' : ''}
    `;
}

function renderProgressOverview() {
    const container = document.getElementById('progressOverview');
    const constellationProgress = Math.min(100, (appState.totalCompletedQuests / 20) * 100);
    const circumference = 2 * Math.PI * 50;
    const dashoffset = circumference * (1 - constellationProgress / 100);

    container.innerHTML = `
        <div class="progress-header">
            <h2>
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
                Progress Overview
            </h2>
            <p>Your journey so far</p>
        </div>
        <div class="progress-stats">
            <div class="stat-card stat-card-quests">
                <div class="stat-label">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                    Total Quests Completed
                </div>
                <div class="stat-value">${appState.totalCompletedQuests}</div>
                <div class="stat-subtext">Keep the momentum going!</div>
            </div>

            <div class="stat-card stat-card-streak">
                <div class="stat-label">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                    </svg>
                    Current Streak
                </div>
                <div class="stat-value">${appState.currentStreak} Days</div>
                <div class="stat-subtext">🔥 On fire! Don't break the chain!</div>
            </div>

            <div class="stat-card stat-card-constellation">
                <div class="stat-label">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                    Constellation Brightness
                </div>
                <div class="constellation-circle" style="position: relative;">
                    <svg class="circle-svg" viewBox="0 0 112 112">
                        <circle class="circle-bg" cx="56" cy="56" r="50"></circle>
                        <circle class="circle-progress" cx="56" cy="56" r="50"
                            stroke-dasharray="${circumference}"
                            stroke-dashoffset="${dashoffset}">
                        </circle>
                    </svg>
                    <div class="circle-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                        ${Math.round(constellationProgress)}%
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${constellationProgress}%"></div>
                </div>
                <p class="progress-text">
                    ${constellationProgress < 100 ? 
                        'Your constellation grows brighter with each quest!' : 
                        '✨ Your constellation shines at full brilliance! ✨'}
                </p>
            </div>

            <button class="btn-history">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                View Quest History
            </button>
        </div>
    `;
}

function renderAll() {
    renderUserSummary();
    renderGameWorld();
    renderActiveQuests();
    renderProgressOverview();
}

// ====================================
// GAME LOGIC
// ====================================

function completeQuest(questId) {
    const quest = appState.quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    // Mark quest as completed
    quest.completed = true;

    // Award XP
    let newXP = appState.currentXP + quest.xpReward;
    let leveledUp = false;

    showToast(`Quest Complete! +${quest.xpReward} XP`, quest.title);

    // Check for level up
    if (newXP >= appState.xpToNextLevel) {
        newXP = newXP - appState.xpToNextLevel;
        appState.level++;
        leveledUp = true;
        setTimeout(() => {
            showToast(
                `🎉 Level Up! You are now Level ${appState.level}! 🎉`,
                "Your power grows stronger!",
                5000
            );
        }, 500);
    }

    appState.currentXP = newXP;
    appState.totalCompletedQuests++;

    renderAll();
}

function openQuestGiverDialog() {
    const dialog = document.getElementById('questGiverDialog');
    const quoteElement = document.getElementById('questGiverQuote');
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    quoteElement.textContent = `"${randomQuote}"`;
    dialog.classList.remove('hidden');

    appState.hasSpokenToQuestGiver = true;
    const footer = document.getElementById('footerMessage');
    footer.classList.remove('hidden');
}

function closeQuestGiverDialog() {
    const dialog = document.getElementById('questGiverDialog');
    dialog.classList.add('hidden');
}

// ====================================
// GAME WORLD MOVEMENT
// ====================================

const MOVE_SPEED = 3;
const INTERACT_DISTANCE = 80;

function gameLoop() {
    let newX = appState.playerPos.x;
    let newY = appState.playerPos.y;
    let moved = false;

    if (appState.keysPressed.has('a') || appState.keysPressed.has('arrowleft')) {
        newX -= MOVE_SPEED;
        appState.facingDirection = 'left';
        moved = true;
    }
    if (appState.keysPressed.has('d') || appState.keysPressed.has('arrowright')) {
        newX += MOVE_SPEED;
        appState.facingDirection = 'right';
        moved = true;
    }
    if (appState.keysPressed.has('w') || appState.keysPressed.has('arrowup')) {
        newY -= MOVE_SPEED;
        appState.facingDirection = 'up';
        moved = true;
    }
    if (appState.keysPressed.has('s') || appState.keysPressed.has('arrowdown')) {
        newY += MOVE_SPEED;
        appState.facingDirection = 'down';
        moved = true;
    }

    // Boundaries
    newX = Math.max(30, Math.min(770, newX));
    newY = Math.max(30, Math.min(470, newY));

    if (moved) {
        appState.playerPos = { x: newX, y: newY };
    }

    // Check distance to quest giver
    const distance = calculateDistance(appState.playerPos, appState.questGiverPos);
    appState.showInteractPrompt = distance < INTERACT_DISTANCE;

    if (moved || appState.showInteractPrompt !== appState.prevShowInteractPrompt) {
        renderGameWorld();
        appState.prevShowInteractPrompt = appState.showInteractPrompt;
    }

    requestAnimationFrame(gameLoop);
}

// ====================================
// EVENT LISTENERS
// ====================================

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'e'].includes(key)) {
        e.preventDefault();
        appState.keysPressed.add(key);
        
        if (key === 'e' && appState.showInteractPrompt) {
            openQuestGiverDialog();
        }
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    appState.keysPressed.delete(key);
});

document.getElementById('closeDialog').addEventListener('click', closeQuestGiverDialog);

// Close dialog when clicking overlay
document.getElementById('questGiverDialog').addEventListener('click', (e) => {
    if (e.target.id === 'questGiverDialog') {
        closeQuestGiverDialog();
    }
});

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    requestAnimationFrame(gameLoop);
});