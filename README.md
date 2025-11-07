# FAQ Bubble Chatbot

Simple, fast FAQ chatbot with smart keyword matching. Works 100% offline - no AI or API required!

## ✨ Features

💬 **Pure FAQ Search** - Instant answers from your FAQ database
🎯 **Smart Keyword Matching** - Finds answers using tag-based search
🎨 **Fully Customizable** - Colors, messages, position, and more
📱 **Responsive Design** - Works on all devices
⚡ **Lightning Fast** - No API calls, no loading times
🔒 **100% Offline** - No external dependencies

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Open Browser
Navigate to http://localhost:3000

The chatbot bubble will appear in the bottom right corner!

## 🎯 How It Works

1. **User asks a question**
2. **Smart search**: Bot searches FAQ using keyword matching
3. **If found** → Instant response with "FAQ" badge
4. **If not found** → Shows customizable "not found" message

## 🛠️ Customization

### Add/Edit FAQs
Edit `public/faq.json`:

```json
{
  "id": 11,
  "question": "Your question here?",
  "answer": "Your detailed answer here.",
  "tags": ["keyword1", "keyword2", "keyword3"]
}
```

**Tips for effective tags:**
- Use lowercase keywords
- Include synonyms (e.g., "ship", "delivery", "transport")
- Add common variations ("password", "pass", "credentials")
- Keep tags 3-10 characters for best matching
- Think about how users might phrase questions

### Configure Bot Settings
Edit `src/ChatBot.js`:

```javascript
const [config] = useState({
  botName: 'FAQ Assistant',
  welcomeMessage: 'Hi! How can I help you?',
  notFoundMessage: 'Sorry, I couldn't find an answer...',
  primaryColor: '#3b82f6',
  position: 'bottom-right'
});
```

**Available positions:**
- `bottom-right`
- `bottom-left`
- `top-right`
- `top-left`

### Customize Colors
Change the `primaryColor` value to any hex color:
- Blue: `#3b82f6`
- Green: `#10b981`
- Purple: `#8b5cf6`
- Red: `#ef4444`

## 📁 File Structure

```
faq-bubble-chatbot/
├── public/
│   ├── index.html       # Main HTML file
│   └── faq.json         # FAQ database (EDIT THIS!)
├── src/
│   ├── App.js           # Main app component
│   ├── ChatBot.js       # Chatbot component (CUSTOMIZE HERE!)
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies
└── README.md           # This file
```

## 🎨 Customization Examples

### Example 1: E-commerce FAQ
```json
{
  "id": 1,
  "question": "How do I track my order?",
  "answer": "Log into your account and visit 'My Orders'. You'll see tracking info for all shipments.",
  "tags": ["track", "tracking", "order", "where", "package", "shipment"]
}
```

### Example 2: Tech Support FAQ
```json
{
  "id": 2,
  "question": "How do I reset my device?",
  "answer": "Hold the power button for 10 seconds until the device turns off. Wait 5 seconds, then turn it back on.",
  "tags": ["reset", "restart", "reboot", "device", "power", "turn off"]
}
```

## 🔧 Advanced Features

### Keyword Matching Algorithm
The chatbot uses a scoring system:
- **Tag match**: +2 points per matching tag
- **Partial match**: +1 point
- **Question match**: +10 points (exact match)
- **Minimum score**: 2 points required

### Example Matching
User asks: "What's your shipping time?"
- Matches tags: "shipping", "time"
- Score: 4 points
- Result: Returns FAQ #4 about shipping

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Creates optimized files in `build/` folder.

### Deploy To:
- **Netlify**: Drag and drop `build/` folder
- **Vercel**: Connect GitHub repo and deploy
- **GitHub Pages**: Push to gh-pages branch
- **Any static host**: Upload `build/` folder

### Deployment Checklist:
✅ Update FAQ with your real questions
✅ Customize bot name and colors
✅ Test all FAQ answers
✅ Update welcome and not-found messages
✅ Set correct contact info in not-found message
✅ Test on mobile devices

## 💡 Best Practices

### Writing Good FAQs
1. **Clear questions**: Use simple, direct language
2. **Comprehensive answers**: Include all necessary details
3. **Action steps**: Use numbered lists for processes
4. **Contact info**: Always provide alternative support options

### Creating Effective Tags
1. **Think like users**: How would they phrase it?
2. **Include variations**: "ship", "shipping", "deliver", "delivery"
3. **Common misspellings**: Consider adding if common
4. **Keep it simple**: 5-10 tags per FAQ is ideal

### Optimizing Performance
- Keep FAQ database under 100 entries
- Use concise answers (under 200 words)
- Regular expressions slow down matching - avoid them
- Test with real user questions

## 🔍 Troubleshooting

### FAQ Not Matching?
1. Check tags include relevant keywords
2. Try adding more variations
3. Test exact phrases users might type
4. Review console logs for scoring

### Styling Issues?
1. Check browser compatibility
2. Clear browser cache
3. Verify Tailwind classes are correct
4. Test in different viewports

### Build Errors?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 FAQ Statistics

Monitor which questions users ask most:
1. Add analytics to track searches
2. Review common "not found" queries
3. Add new FAQs based on patterns
4. Update tags for better matching

## 🤝 Contributing

Feel free to:
- Add more FAQ examples
- Improve matching algorithm
- Enhance UI/UX
- Fix bugs

## 📝 License

MIT License - Free to use and modify

## 🎉 Credits

- Built with React
- Icons by Lucide React
- Styled with Tailwind CSS

---

Made with ❤️ for better customer support

**Questions?** Check the FAQ in the chatbot! 😄
