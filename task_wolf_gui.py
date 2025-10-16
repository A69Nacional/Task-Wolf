import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import subprocess
import threading
import os
import sys
from pathlib import Path

class TaskWolfGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("🐺 Task Wolf - Automated Testing Suite")
        self.root.geometry("800x600")
        self.root.configure(bg='#f0f0f0')
        
        # Variables
        self.process = None
        self.project_path = self.find_project_path()
        
        self.setup_ui()
        
    def find_project_path(self):
        """Find the Task Wolf project directory"""
        current_dir = Path.cwd()
        
        # Check if we're already in Task Wolf directory
        if (current_dir / "package.json").exists():
            return str(current_dir)
            
        # Check parent directories
        for parent in current_dir.parents:
            if (parent / "Task Wolf" / "package.json").exists():
                return str(parent / "Task Wolf")
                
        # Default to current directory
        return str(current_dir)
        
    def setup_ui(self):
        # Title Frame
        title_frame = tk.Frame(self.root, bg='#2c3e50', height=80)
        title_frame.pack(fill='x')
        title_frame.pack_propagate(False)
        
        title_label = tk.Label(
            title_frame, 
            text="🐺 Task Wolf - Automated Testing Suite", 
            font=('Arial', 18, 'bold'),
            fg='white', 
            bg='#2c3e50'
        )
        title_label.pack(expand=True)
        
        # Project Path Frame
        path_frame = tk.Frame(self.root, bg='#f0f0f0')
        path_frame.pack(fill='x', padx=10, pady=5)
        
        tk.Label(path_frame, text="Project Path:", font=('Arial', 10, 'bold'), bg='#f0f0f0').pack(anchor='w')
        self.path_label = tk.Label(
            path_frame, 
            text=self.project_path, 
            font=('Arial', 9), 
            bg='white', 
            relief='sunken', 
            anchor='w'
        )
        self.path_label.pack(fill='x', pady=(0, 10))
        
        # Main Content Frame
        main_frame = tk.Frame(self.root, bg='#f0f0f0')
        main_frame.pack(fill='both', expand=True, padx=10)
        
        # Left Panel - Controls
        control_frame = tk.LabelFrame(main_frame, text="Test Execution Controls", font=('Arial', 11, 'bold'))
        control_frame.pack(side='left', fill='y', padx=(0, 10), pady=5)
        
        # Test Buttons
        self.create_test_buttons(control_frame)
        
        # Right Panel - Output
        output_frame = tk.LabelFrame(main_frame, text="Test Output", font=('Arial', 11, 'bold'))
        output_frame.pack(side='right', fill='both', expand=True, pady=5)
        
        self.output_text = scrolledtext.ScrolledText(
            output_frame, 
            wrap=tk.WORD, 
            font=('Consolas', 9),
            bg='#1e1e1e', 
            fg='#00ff00',
            insertbackground='white'
        )
        self.output_text.pack(fill='both', expand=True, padx=5, pady=5)
        
        # Status Bar
        self.status_bar = tk.Label(
            self.root, 
            text="Ready to run tests", 
            relief=tk.SUNKEN, 
            anchor='w',
            bg='#34495e',
            fg='white',
            font=('Arial', 9)
        )
        self.status_bar.pack(side='bottom', fill='x')
        
    def create_test_buttons(self, parent):
        buttons_config = [
            ("🚀 Run All Tests", "npm test", "#3498db"),
            ("👁️ Run Tests (Visible)", "npm run test:headed", "#e67e22"),
            ("🐛 Debug Mode", "npm run test:debug", "#e74c3c"),
            ("🎮 Interactive UI", "npm run test:ui", "#9b59b6"),
            ("", "", ""),  # Separator
            ("🌐 Chrome Only", "npm run test:chrome", "#4CAF50"),
            ("🦊 Firefox Only", "npm run test:firefox", "#FF5722"),
            ("🍎 Safari Only", "npm run test:safari", "#607D8B"),
            ("📱 Mobile Tests", "npm run test:mobile", "#795548"),
            ("", "", ""),  # Separator
            ("⚡ Performance Tests", "npm run test:performance", "#FF9800"),
            ("📐 Responsive Tests", "npm run test:responsive", "#00BCD4"),
            ("", "", ""),  # Separator
            ("📊 View Report", "npm run report", "#8BC34A"),
            ("🧹 Clean Results", "npm run clean", "#757575"),
        ]
        
        for i, (text, command, color) in enumerate(buttons_config):
            if not text:  # Separator
                separator = tk.Frame(parent, height=2, bg='#bdc3c7')
                separator.pack(fill='x', pady=5)
                continue
                
            btn = tk.Button(
                parent,
                text=text,
                command=lambda cmd=command: self.run_command(cmd),
                font=('Arial', 10, 'bold'),
                bg=color,
                fg='white',
                relief='raised',
                bd=2,
                width=25,
                pady=5
            )
            btn.pack(pady=2, padx=5, fill='x')
            
            # Hover effects
            btn.bind("<Enter>", lambda e, b=btn: b.config(relief='ridge'))
            btn.bind("<Leave>", lambda e, b=btn: b.config(relief='raised'))
    
    def run_command(self, command):
        """Execute npm command in separate thread"""
        if self.process and self.process.poll() is None:
            messagebox.showwarning("Warning", "A test is already running!")
            return
            
        self.output_text.delete(1.0, tk.END)
        self.status_bar.config(text=f"Running: {command}")
        
        thread = threading.Thread(target=self._execute_command, args=(command,))
        thread.daemon = True
        thread.start()
    
    def _execute_command(self, command):
        """Execute command and capture output"""
        try:
            # Change to project directory
            os.chdir(self.project_path)
            
            self.append_output(f"🐺 Task Wolf Execution Started\n")
            self.append_output(f"📁 Directory: {self.project_path}\n")
            self.append_output(f"⚡ Command: {command}\n")
            self.append_output("=" * 60 + "\n\n")
            
            # Execute command
            self.process = subprocess.Popen(
                command,
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                universal_newlines=True,
                bufsize=1
            )
            
            # Read output in real-time
            for line in iter(self.process.stdout.readline, ''):
                self.append_output(line)
                
            self.process.wait()
            
            if self.process.returncode == 0:
                self.append_output(f"\n✅ Command completed successfully!")
                self.status_bar.config(text="✅ Tests completed successfully")
            else:
                self.append_output(f"\n❌ Command failed with exit code: {self.process.returncode}")
                self.status_bar.config(text="❌ Tests failed - check output")
                
        except Exception as e:
            self.append_output(f"Error: {str(e)}")
            self.status_bar.config(text=f"Error: {str(e)}")
    
    def append_output(self, text):
        """Thread-safe output append"""
        self.root.after(0, self._append_output, text)
    
    def _append_output(self, text):
        """Append text to output widget"""
        self.output_text.insert(tk.END, text)
        self.output_text.see(tk.END)
        self.root.update_idletasks()

def main():
    root = tk.Tk()
    
    # Set icon if available
    try:
        # You can add an .ico file here if you want
        pass
    except:
        pass
        
    app = TaskWolfGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()