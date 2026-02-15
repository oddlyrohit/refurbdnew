"use client";

import { useState, useEffect } from "react";
import { User, Lock, Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccess(false);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setProfileSuccess(true);
        setTimeout(() => setProfileSuccess(false), 3000);
      }
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("New passwords don't match.");
      return;
    }
    if (passwords.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }

    setSavingPassword(true);
    try {
      const res = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });
      if (res.ok) {
        setPasswordSuccess(true);
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        const data = await res.json();
        setPasswordError(data.error || "Failed to update password.");
      }
    } finally {
      setSavingPassword(false);
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Account Settings</h1>
        <div className="mt-6 space-y-6">
          <div className="h-60 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse" />
          <div className="h-48 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Account Settings</h1>
      <p className="mt-1 text-neutral-500">Update your profile and security settings.</p>

      {/* Profile Section */}
      <form onSubmit={handleProfileSubmit} className="mt-6 rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
            <User className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Profile Information</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <Input
            label="Last Name"
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={profile.email}
            disabled
            className="sm:col-span-2 opacity-60"
          />
          <Input
            label="Phone"
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="sm:col-span-2"
          />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button type="submit" isLoading={savingProfile}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
          {profileSuccess && (
            <span className="flex items-center gap-1 text-sm text-success-600">
              <CheckCircle className="h-4 w-4" />
              Profile updated
            </span>
          )}
        </div>
      </form>

      {/* Password Section */}
      <form onSubmit={handlePasswordSubmit} className="mt-6 rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Change Password</h2>
        </div>

        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
            required
          />
          <Input
            label="New Password"
            type="password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
            required
          />
        </div>

        {passwordError && (
          <p className="mt-3 text-sm text-danger-500">{passwordError}</p>
        )}

        <div className="mt-5 flex items-center gap-3">
          <Button type="submit" variant="outline" isLoading={savingPassword}>
            <Lock className="h-4 w-4" />
            Update Password
          </Button>
          {passwordSuccess && (
            <span className="flex items-center gap-1 text-sm text-success-600">
              <CheckCircle className="h-4 w-4" />
              Password updated
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
