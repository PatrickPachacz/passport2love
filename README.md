# Passport2love.com

# About
<p>Dating app deployed using netlify and render.</p>

# Landing Page
<p>
    Login / Signup built in component.<br>
    Allows users to add information ranging from country of origin and age to their personal image and video.<br>
    Brief information describing app outline and features to potential clients.
</p>

![image](https://github.com/user-attachments/assets/186d4cf0-d490-4b94-8045-0beaeb67c6d2)

![landingpage2](https://github.com/user-attachments/assets/8b59526a-9134-4552-a3d0-e00fc1666b88)

![landingpage3](https://github.com/user-attachments/assets/4ed00e4b-f86e-449a-8a78-d1c115cb8611)

# Dashboard
<p>Allows user to interact with different features:<br>
    • Searching for other users<br>
    • Accessing chats with other users<br>
    • Users profile page<br>
    • Editing of users profile page<br>
</p>

![dashboard](https://github.com/user-attachments/assets/47d93c78-581a-448a-beb0-5187415d5678)

# Searching Users
• Search users by certain criteria

![searchuser](https://github.com/user-attachments/assets/fbc0e51e-7c48-488c-8ee6-fd5cea32833f)

# Real-time Chat
• Messages are exchanged between users in real-time using Socket.io.</p>
• When a user sends a message, the backend broadcasts it to the recipient immediately</p>
<h2>Typing Indicator (Lottie Animation):</h2>
• When a user starts typing, a "typing" event is emitted via Socket.io.
• The receiving user sees an animated typing indicator (Lottie) until the sender stops typing.
• Once the user stops, the "stopped typing" event is emitted, and the animation disappears.
<h2>Database Storage:</h2>
• Messages are stored in MongoDB, allowing users to see past conversations even after refreshing or logging out. 

<br><br>

![chatscreenshot](https://github.com/user-attachments/assets/fe0fe718-e850-4405-aec9-5db093f71109)
