"""
Task Wolf Test Runner
Simple GUI interface for executing automated tests
"""

import tkinter as tk
from tkinter import messagebox
import subprocess
import os
import sys
from pathlib import Path

class SimpleTaskWolfRunner:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("🐺 Task Wolf Test Runner")
        self.root.geometry("500x400")
        self.root.configure(bg='#f0f0f0')
        
        # Find project directory
        self.project_path = str(Path.cwd())
        
        self.setup_ui()
        
    def setup_ui(self):
        # Title
        title = tk.Label(
            self.root, 
            text="🐺 Task Wolf Test Runner", 
            font=('Arial', 16, 'bold'),
            bg='#f0f0f0'
        )
        title.pack(pady=20)
        
        # Path info
        path_info = tk.Label(
            self.root,
            text=f"Project: {os.path.basename(self.project_path)}",
            font=('Arial', 10),
            bg='#f0f0f0'
        )
        path_info.pack(pady=5)
        
        # Buttons frame
        btn_frame = tk.Frame(self.root, bg='#f0f0f0')
        btn_frame.pack(pady=20, expand=True)
        
        # Test buttons
        tests = [
            ("🚀 Run All Tests", "npm test"),
            ("👁️ Run Tests (Visible)", "npm run test:headed"), 
            ("🎮 Interactive Mode", "npm run test:ui"),
            ("⚡ Performance Tests", "npm run test:performance"),
            ("📱 Mobile Tests", "npm run test:mobile"),
            ("📊 View Report", "npm run report"),
        ]
        
        for text, command in tests:
            btn = tk.Button(
                btn_frame,
                text=text,
                command=lambda cmd=command: self.run_test(cmd),
                font=('Arial', 11, 'bold'),
                width=25,
                height=2,
                bg='#3498db',
                fg='white',
                relief='raised'
            )
            btn.pack(pady=5)
            
    def run_test(self, command):
        """Execute test command"""
        try:
            messagebox.showinfo("Starting Tests", f"Executing: {command}\n\nCheck your terminal for output...")
            
            # Change to project directory and run command
            os.chdir(self.project_path)
            
            # Run in new terminal window
            if sys.platform == "win32":
                subprocess.Popen(f'start cmd /k "{command}"', shell=True)
            else:
                subprocess.Popen(['gnome-terminal', '--', 'bash', '-c', f'{command}; read'])
                
        except Exception as e:
            messagebox.showerror("Error", f"Failed to run command: {str(e)}")
    
    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    app = SimpleTaskWolfRunner()
    app.run()