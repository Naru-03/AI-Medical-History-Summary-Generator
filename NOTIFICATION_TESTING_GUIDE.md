# 🔔 Notification Testing Guide

This guide will help you test all notification features in your AI Medical History Summary Generator application.

## 🚀 Quick Start Testing

### 1. **Start Your Application**
```bash
# Windows
start-project.bat

# Linux/Mac
./start-project.sh

# NPM
cd frontend && npm run start:full
```

### 2. **Access Test Pages**
- **Main App**: http://localhost:3000
- **Notification Test Page**: http://localhost:3000/test-notifications
- **Standalone Test**: Open `test-notifications.html` in your browser

## 🧪 Testing Methods

### Method 1: Built-in Test Page (Recommended)

1. **Navigate to Test Page**
   - Go to http://localhost:3000/test-notifications
   - Or click "🔔 Test Notifications" in the navigation

2. **Test Basic Notifications**
   - Click different notification type buttons
   - Observe notifications appearing in top-right corner
   - Test clicking notifications to dismiss them

3. **Test Settings**
   - Toggle notification settings on/off
   - Test sound effects
   - Test desktop notifications

4. **Test Advanced Features**
   - Multiple notifications
   - Long text notifications
   - Persistent notifications
   - Custom notifications

### Method 2: Standalone HTML Test

1. **Open Test File**
   - Open `test-notifications.html` in your browser
   - This tests browser capabilities without React

2. **Test Browser Notifications**
   - Click "Request Permission" first
   - Test basic notifications
   - Check permission status

3. **Test Audio**
   - Test different sound types
   - Verify audio context works

### Method 3: Real App Testing

1. **Upload a Document**
   - Go to Dashboard
   - Upload a medical document
   - Watch for upload success notification

2. **Generate Summary**
   - Click "Generate Summary"
   - Watch for summary generation notification

3. **Export/Copy**
   - Go to Summary page
   - Test copy and download notifications

## 🔍 What to Test

### ✅ **Basic Notification Types**
- **Success**: Green notifications for successful actions
- **Error**: Red notifications for errors
- **Warning**: Yellow notifications for warnings
- **Info**: Blue notifications for information

### 🔊 **Audio Features**
- **Sound Effects**: Different tones for different types
- **Volume Control**: Respects system volume
- **Audio Context**: Works in modern browsers

### 🖥️ **Desktop Notifications**
- **Permission Request**: Browser asks for permission
- **System Integration**: Appears in OS notification area
- **Click Actions**: Clicking notification focuses app

### ⚙️ **Settings Integration**
- **Enable/Disable**: Toggle notifications on/off
- **Sound Control**: Toggle audio feedback
- **Desktop Control**: Toggle desktop notifications
- **Persistence**: Settings saved to localStorage

### 📱 **Responsive Design**
- **Mobile**: Notifications work on mobile devices
- **Tablet**: Proper sizing on tablets
- **Desktop**: Full functionality on desktop

## 🐛 Troubleshooting

### Common Issues

#### **No Notifications Appearing**
1. Check browser console for errors
2. Verify notification settings are enabled
3. Check if browser blocks notifications
4. Try refreshing the page

#### **Desktop Notifications Not Working**
1. Check browser permission settings
2. Look for browser notification icon in address bar
3. Check OS notification settings
4. Try different browser

#### **Audio Not Working**
1. Check system volume
2. Check browser audio permissions
3. Try different browser
4. Check if audio context is supported

#### **Settings Not Saving**
1. Check localStorage in browser dev tools
2. Verify browser allows localStorage
3. Try clearing browser data and retesting

### Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Basic Notifications | ✅ | ✅ | ✅ | ✅ |
| Desktop Notifications | ✅ | ✅ | ✅ | ✅ |
| Audio Context | ✅ | ✅ | ✅ | ✅ |
| localStorage | ✅ | ✅ | ✅ | ✅ |

## 📊 Test Scenarios

### Scenario 1: First Time User
1. Open app for first time
2. Check if permission request appears
3. Test basic functionality
4. Verify settings are saved

### Scenario 2: Power User
1. Enable all notification types
2. Test multiple rapid actions
3. Test all notification types
4. Verify performance

### Scenario 3: Mobile User
1. Open on mobile device
2. Test touch interactions
3. Test notification display
4. Test audio (if enabled)

### Scenario 4: Disabled Notifications
1. Disable all notifications
2. Verify no notifications appear
3. Re-enable and test again
4. Verify settings persist

## 🎯 Expected Results

### ✅ **Success Indicators**
- Notifications appear in top-right corner
- Different colors for different types
- Smooth animations and transitions
- Click to dismiss functionality
- Settings persist between sessions
- Desktop notifications work (if enabled)
- Audio feedback works (if enabled)

### ❌ **Failure Indicators**
- No notifications appear
- JavaScript errors in console
- Settings not saving
- Desktop notifications blocked
- Audio not working
- Poor performance with many notifications

## 🔧 Debug Commands

### Browser Console Commands
```javascript
// Check notification permission
console.log('Notification permission:', Notification.permission);

// Check localStorage settings
console.log('Notification settings:', localStorage.getItem('notificationSettings'));

// Test notification manually
new Notification('Test', { body: 'Manual test' });

// Check audio context
console.log('Audio context:', new (window.AudioContext || window.webkitAudioContext)());
```

### React DevTools
1. Install React DevTools browser extension
2. Inspect NotificationProvider component
3. Check state and props
4. Monitor re-renders

## 📝 Test Checklist

- [ ] Basic notification types work
- [ ] Notifications appear in correct position
- [ ] Click to dismiss works
- [ ] Auto-dismiss works
- [ ] Multiple notifications stack properly
- [ ] Settings toggle works
- [ ] Settings persist between sessions
- [ ] Desktop notifications work
- [ ] Audio feedback works
- [ ] Mobile responsive
- [ ] No JavaScript errors
- [ ] Performance is good
- [ ] All app features trigger notifications

## 🚀 Next Steps

After testing:
1. Document any issues found
2. Test on different browsers
3. Test on different devices
4. Gather user feedback
5. Optimize based on results

---

**Need Help?** Check the browser console for errors or open an issue with detailed steps to reproduce any problems.
