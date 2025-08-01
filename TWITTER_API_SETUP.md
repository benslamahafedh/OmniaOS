# Twitter API Setup Guide for OmniaOS

## Overview
This guide explains how to set up real Twitter API integration to fetch tweets from @omniaosdotfun instead of using mock data.

## Current Implementation
The Twitter feed currently uses mock data that simulates real tweets from the @omniaosdotfun account. This provides a realistic preview while avoiding API rate limits and authentication complexity.

## Setting Up Real Twitter API

### 1. Twitter API Access
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Apply for a Twitter Developer Account
3. Create a new app for OmniaOS
4. Get your Bearer Token

### 2. Environment Variables
Add to your `.env` file:
```env
REACT_APP_TWITTER_BEARER_TOKEN=your_bearer_token_here
```

### 3. Backend Proxy (Recommended)
Due to CORS restrictions, create a backend proxy:

#### Option A: Vercel API Route
Create `api/twitter/[username].ts`:
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username } = req.query;
  
  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}/tweets?max_results=10&tweet.fields=created_at,public_metrics&user.fields=name,username,profile_image_url,verified`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
}
```

#### Option B: Express.js Backend
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api/twitter/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}/tweets?max_results=10&tweet.fields=created_at,public_metrics&user.fields=name,username,profile_image_url,verified`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
});

app.listen(3001, () => {
  console.log('Twitter API proxy running on port 3001');
});
```

### 4. Update the Hook
In `src/hooks/useTwitterFeed.ts`, uncomment and modify the API call:

```typescript
const fetchTweets = async () => {
  try {
    setLoading(true);
    setError(null);

    // Replace mock data with real API call
    const response = await fetch('/api/twitter/omniaosdotfun');
    
    if (!response.ok) {
      throw new Error('Failed to fetch tweets');
    }
    
    const data: TwitterApiResponse = await response.json();
    
    // Process the real data...
    const user = data.includes?.users?.[0];
    if (!user) {
      throw new Error('User data not found');
    }

    const processedTweets: Tweet[] = data.data.map((tweet) => ({
      id: tweet.id,
      type: 'tweet',
      user: {
        name: user.name,
        handle: `@${user.username}`,
        avatar: user.profile_image_url,
        verified: user.verified
      },
      content: tweet.text,
      timestamp: formatTimestamp(tweet.created_at),
      likes: tweet.public_metrics.like_count,
      retweets: tweet.public_metrics.retweet_count,
      replies: tweet.public_metrics.reply_count
    }));

    setTweets(processedTweets);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to fetch tweets');
    // Keep fallback tweets for error cases
  } finally {
    setLoading(false);
  }
};
```

## API Rate Limits
- Twitter API v2 has rate limits
- Free tier: 500,000 requests per month
- Consider caching responses to avoid hitting limits

## Error Handling
The current implementation includes:
- Loading states
- Error handling with retry functionality
- Fallback to mock data if API fails
- Graceful degradation

## Security Notes
- Never expose your Bearer Token in client-side code
- Always use a backend proxy
- Implement proper CORS policies
- Consider rate limiting on your proxy

## Testing
1. Set up the backend proxy
2. Update the environment variables
3. Test with a small number of tweets first
4. Monitor API usage and rate limits

## Current Mock Data
The mock data includes realistic tweets about:
- OmniaOS launch announcement
- AI companion introductions (Samantha, Elias, Lyra)
- Privacy and safety features
- Premium features coming soon

This provides a good representation of what real tweets would look like while the API integration is being set up. 