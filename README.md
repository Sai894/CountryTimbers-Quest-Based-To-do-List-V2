# Quest Hero - Vanilla JS Implementation

This is a standalone HTML/CSS/JavaScript implementation of the Quest Hero application. No build tools or frameworks required!

## Files Structure

```
export/
├── index.html      # Main HTML file
├── styles.css      # All styles (converted from Tailwind)
├── app.js          # All JavaScript logic
└── README.md       # This file
```

## How to Use

### Quick Start

1. **Simply open `index.html` in any modern web browser**
   - Double-click the file, or
   - Right-click → "Open with" → Your browser
   - Or drag and drop into your browser window

That's it! No server, no build process, no dependencies needed.

### Hosting Online

To deploy this on a web server:

1. Upload all three files (`index.html`, `styles.css`, `app.js`) to your web hosting
2. Keep them in the same directory
3. Access via your domain/URL

Works with any hosting service:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting
- AWS S3
- Google Cloud Storage

## Features

### 1. User Summary
- Displays hero name, level, and XP progress
- Visual progress bar showing XP to next level
- Avatar with level badge

### 2. Game World (Bird's Eye View)
- Top-down 2D game world
- Move character with WASD or Arrow Keys
- Interact with Quest Giver (press E when nearby)
- Visual compass for orientation
- Grass terrain with trees, rocks, and flowers

### 3. Active Quests
- List of available quests
- Difficulty badges (Easy, Medium, Hard)
- XP rewards shown for each quest
- Click "Complete Quest" to finish a quest
- Visual feedback when quest is completed

### 4. Progress Overview
- Total quests completed counter
- Current streak tracker
- Constellation brightness progress (circular progress indicator)
- "View Quest History" button (ready for future implementation)

### 5. Quest Giver Interaction
- Walk your character near the Quest Giver
- Press E to receive motivational quotes
- Random wisdom messages to keep you motivated

### 6. Notifications
- Toast notifications when completing quests
- Level up celebrations with special notifications

## Controls

### Keyboard Controls
- **W** or **↑** - Move Up
- **A** or **←** - Move Left  
- **S** or **↓** - Move Down
- **D** or **→** - Move Right
- **E** - Interact with Quest Giver (when nearby)

### Mouse Controls
- Click "Complete Quest" buttons to finish quests
- Click "Thank you, wise one" to close Quest Giver dialog

## Customization

### Modifying Quests

Edit the `quests` array in `app.js` (around line 16):

```javascript
quests: [
    {
        id: 1,
        title: "Your Quest Title",
        description: "Your quest description here.",
        difficulty: "Easy", // Easy, Medium, or Hard
        xpReward: 50,
        completed: false
    },
    // Add more quests...
]
```

### Changing Colors

All colors are defined in `styles.css`. Main color scheme:
- **Blue (#2563eb)**: Primary UI elements
- **Indigo (#6366f1)**: Quest Giver and progress
- **Amber (#d97706)**: Accents and borders
- **Green (#16a34a)**: Game world grass
- **Yellow (#fbbf24)**: XP and rewards

### Adjusting Game Settings

In `app.js`, modify these constants:

```javascript
const MOVE_SPEED = 3;           // Player movement speed (lower = slower)
const INTERACT_DISTANCE = 80;   // Distance to trigger Quest Giver interaction
```

### Adding More Motivational Quotes

Edit the `motivationalQuotes` array in `app.js`:

```javascript
const motivationalQuotes = [
    "Your custom quote here!",
    "Add as many as you want!",
    // ...
];
```

## Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (80+)
- ✅ Firefox (75+)
- ✅ Safari (13+)
- ✅ Opera (67+)

**Note**: Internet Explorer is not supported (uses modern CSS features like Grid and Flexbox)

## Responsive Design

The application is responsive and works on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktop monitors (1280px+)

## Performance

- **Lightweight**: Total size < 100KB
- **No dependencies**: Pure vanilla JavaScript
- **Optimized animations**: Uses CSS transforms and requestAnimationFrame
- **Smooth gameplay**: 60 FPS movement

## Future Enhancements

Ideas for extending the application:

1. **Persistence**
   - Add localStorage to save progress
   - Implement quest history tracking

2. **More Features**
   - Daily quest rotation
   - Achievement system
   - Multiple quest givers
   - Character customization

3. **Multiplayer** (requires backend)
   - Share quests with friends
   - Leaderboards
   - Quest collaborations

## Code Structure

### HTML (`index.html`)
- Semantic HTML5 structure
- Accessible markup
- Modal dialog for Quest Giver

### CSS (`styles.css`)
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Smooth animations
- Custom properties for theming

### JavaScript (`app.js`)
Organized into sections:
1. **State Management**: All app data in one object
2. **Utility Functions**: Helper functions
3. **Render Functions**: UI generation
4. **Game Logic**: Quest completion, XP, leveling
5. **Game World Movement**: Player movement and collision
6. **Event Listeners**: Keyboard and mouse input
7. **Initialization**: App startup

## Troubleshooting

### Character won't move
- Make sure the game world area has focus
- Click on the game area first
- Check browser console for errors

### Styling looks broken
- Ensure `styles.css` is in the same directory as `index.html`
- Check that the CSS file loaded (browser dev tools → Network tab)

### Dialog won't open
- Make sure you're close enough to the Quest Giver
- The "Press [E] to talk" prompt should appear
- Try refreshing the page

### Performance issues
- Close other browser tabs
- Reduce browser zoom to 100%
- Update your browser to the latest version

## Credits

Built with:
- Pure HTML5
- Pure CSS3
- Pure Vanilla JavaScript (ES6+)

No frameworks, no libraries, no build tools!

## License

Free to use and modify for your projects.

## Support

For questions or issues, check:
1. Browser console for JavaScript errors
2. Network tab for loading issues
3. This README for common solutions

---

**Happy Questing! 🎮✨**