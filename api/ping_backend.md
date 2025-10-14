# Persistent Ping Loop with nohup + watch

Here is the procedure to create a ping every 5 minutes (300s):

## 🧪 Recap: Persistent Ping Loop with nohup + watch

### ✅ 1. Create the Ping Script
```bash
mkdir -p ~/.local/bin
nano ~/.local/bin/ping-app.sh
```

Paste this inside:
```bash
#!/bin/bash
curl -s https://your-domain.com > /dev/null
```

Replace `https://your-domain.com` with your actual app URL.

Make it executable:
```bash
chmod +x ~/.local/bin/ping-app.sh
```

### ✅ 2. Start the Background Process
Run this command:
```bash
nohup watch -n 300 ~/.local/bin/ping-app.sh > /dev/null 2>&1 &
```

- `watch -n 300` → runs every 5 minutes
- `nohup` → keeps it alive after logout
- `> /dev/null 2>&1` → discards all output
- `&` → runs in the background

### ✅ 3. Confirm It's Running
```bash
ps aux | grep watch
```
You should see a watch process tied to your script.

### ✅ 4. Stop It (If Needed)
```bash
pkill -f ping-app.sh
```

## 🧠 Optional: Log Each Ping
Edit your script to log timestamps:
```bash
#!/bin/bash
echo "$(date) - pinging app..." >> ~/ping.log
curl -s https://your-domain.com >> ~/ping.log
```
