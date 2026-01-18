"use client";

import SiteHeader from "@/components/shared/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  NotificationIcon,
  SecurityIcon,
  PaintBoardIcon,
  DatabaseIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: "Profile",
      icon: UserIcon,
      description: "Manage your personal information",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              defaultValue="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Tell us about yourself..."
              defaultValue="Passionate about personal growth and mindfulness."
            />
          </div>
          <Button>Save Changes</Button>
        </div>
      ),
    },
    {
      title: "Notifications",
      icon: NotificationIcon,
      description: "Control how and when you receive notifications",
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications for reminders
              </p>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Daily Email Digest</Label>
              <p className="text-sm text-muted-foreground">
                Get a summary of your day via email
              </p>
            </div>
            <Switch checked={emailDigest} onCheckedChange={setEmailDigest} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Streak Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get reminded to maintain your streak
              </p>
            </div>
            <Switch
              checked={streakReminders}
              onCheckedChange={setStreakReminders}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Appearance",
      icon: PaintBoardIcon,
      description: "Customize the look and feel",
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable dark mode for better night reading
              </p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Theme Color</Label>
            <div className="flex gap-3">
              {["blue", "green", "purple", "orange", "pink"].map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full bg-${color}-500 border-2 border-transparent hover:border-primary transition-all`}
                  style={{
                    backgroundColor:
                      color === "blue"
                        ? "#3b82f6"
                        : color === "green"
                          ? "#22c55e"
                          : color === "purple"
                            ? "#a855f7"
                            : color === "orange"
                              ? "#f97316"
                              : "#ec4899",
                  }}
                />
              ))}
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Font Size</Label>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>Small</option>
              <option selected>Medium</option>
              <option>Large</option>
              <option>Extra Large</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "Privacy & Security",
      icon: SecurityIcon,
      description: "Manage your security preferences",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Change Password</Label>
            <Input type="password" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
            <Input type="password" placeholder="Confirm new password" />
            <Button>Update Password</Button>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Add an extra layer of security to your account
            </p>
            <Button variant="outline">Enable 2FA</Button>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Active Sessions</Label>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Current Session</p>
                  <p className="text-xs text-muted-foreground">
                    Chrome on MacOS • Active now
                  </p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Data & Privacy",
      icon: DatabaseIcon,
      description: "Export or delete your data",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Export Data</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Download all your journal entries and data
            </p>
            <Button variant="outline">Export All Data</Button>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Data Backup</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Automatically backup your data to cloud storage
            </p>
            <div className="flex items-center gap-2">
              <Switch defaultChecked />
              <span className="text-sm">Enable automatic backups</span>
            </div>
          </div>
          <Separator />
          <div className="space-y-2 p-4 border border-destructive/50 rounded-lg bg-destructive/5">
            <Label className="text-destructive">Danger Zone</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Permanently delete your account and all data
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <SiteHeader label="Settings" />

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Settings ⚙️</h2>
        <p className="text-muted-foreground">
          Customize your DLOG experience
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={section.icon}
                  className="h-5 w-5 text-primary"
                />
                {section.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </CardHeader>
            <CardContent>{section.component}</CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Info */}
      <Card className="mt-6">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            DLOG Version 1.0.0
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Button variant="link" size="sm">
              Privacy Policy
            </Button>
            <Button variant="link" size="sm">
              Terms of Service
            </Button>
            <Button variant="link" size="sm">
              Help Center
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
