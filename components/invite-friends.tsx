'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Share2, Copy, Mail, MessageCircle } from 'lucide-react';

export function InviteFriends() {
  const [copied, setCopied] = useState(false);
  const [inviteLink, setInviteLink] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvite = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/invite/create', {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create invite');
      }

      const data = await response.json();
      setInviteLink(data.inviteUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create invite');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!inviteLink) return;
    
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareViaEmail = () => {
    const subject = 'Join me for a music taste comparison!';
    const body = `Hey! I just discovered my music taste score and want to compare it with yours. Check out this cool app: ${inviteLink}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareViaSMS = () => {
    const message = `Hey! I just discovered my music taste score and want to compare it with yours. Check out this cool app: ${inviteLink}`;
    window.open(`sms:?body=${encodeURIComponent(message)}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Invite Friends to Compare
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Share your music taste and challenge your friends to see who has the most unique style!
            </p>
          </div>

          {/* Create Invite Button */}
          {!inviteLink && (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Create a unique invite link to challenge your friends!
              </p>
              <Button onClick={createInvite} disabled={loading}>
                {loading ? 'Creating...' : 'Create Invite Link'}
              </Button>
              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}
            </div>
          )}

          {/* Invite Link */}
          {inviteLink && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Invite Link</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-muted text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="mr-1 h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
          )}

          {/* Share Options */}
          <div className="space-y-4">
            <h4 className="font-semibold">Share via</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={shareViaEmail}
                variant="outline"
                className="flex items-center justify-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Button>
              <Button
                onClick={shareViaSMS}
                variant="outline"
                className="flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>SMS</span>
              </Button>
            </div>
          </div>

          {/* Social Share */}
          <div className="space-y-4">
            <h4 className="font-semibold">Social Media</h4>
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => {
                  const text = `I just discovered my music taste score! Can you beat my score? ${inviteLink}`;
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                  window.open(url, '_blank');
                }}
                variant="outline"
                className="flex items-center justify-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share on Twitter</span>
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-sm">How it works:</h4>
            <ol className="text-sm text-muted-foreground space-y-1">
              <li>1. Share your invite link with friends</li>
              <li>2. They connect their Spotify account</li>
              <li>3. Compare your music taste scores</li>
              <li>4. See who has the most unique style!</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
