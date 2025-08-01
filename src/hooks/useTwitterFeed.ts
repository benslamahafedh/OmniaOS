import { useState, useEffect } from 'react';

interface TwitterUser {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
}

interface Tweet {
  id: string;
  type: 'tweet' | 'retweet' | 'reply';
  user: TwitterUser;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  retweetedBy?: TwitterUser;
  replyingTo?: string;
}

interface TwitterApiResponse {
  data: Array<{
    id: string;
    text: string;
    created_at: string;
    public_metrics: {
      retweet_count: number;
      reply_count: number;
      like_count: number;
    };
    referenced_tweets?: Array<{
      type: 'retweeted' | 'replied_to' | 'quoted';
      id: string;
    }>;
  }>;
  includes?: {
    users?: Array<{
      id: string;
      name: string;
      username: string;
      profile_image_url: string;
      verified: boolean;
    }>;
  };
}

export const useTwitterFeed = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatTimestamp = (timestamp: string): string => {
    const now = new Date();
    const tweetDate = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - tweetDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    
    return tweetDate.toLocaleDateString();
  };

  const fetchTweets = async () => {
    try {
      setLoading(true);
      setError(null);

      // Note: In a real implementation, you would need:
      // 1. A Twitter API Bearer Token
      // 2. A backend proxy to avoid CORS issues
      // 3. Proper error handling for rate limits
      
      // For now, we'll use a mock implementation that simulates the API response
      // In production, replace this with actual API call:
      
      /*
      const response = await fetch('/api/twitter/omniaosdotfun', {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tweets');
      }
      
      const data: TwitterApiResponse = await response.json();
      */

             // Real tweets from @omniaosdotfun
       const mockData: TwitterApiResponse = {
         data: [
           {
             id: '1',
             text: '𝘈𝘯𝘪 ´𝘴 𝘭𝘪𝘨𝘩𝘵𝘪𝘯𝘨 𝘪𝘵 𝘶𝘱. 𝘙𝘦𝘴𝘱𝘦𝘤𝘵. 🔥\n\nWait until you see Omnia.',
             created_at: new Date('2024-07-30T10:00:00Z').toISOString(),
             public_metrics: {
               retweet_count: 12,
               reply_count: 8,
               like_count: 89
             }
           },
           {
             id: '2',
             text: 'Ai dating assistant \n\nSay goodbye to feeling tongue tied !\n\nLOVE',
             created_at: new Date('2024-07-30T08:30:00Z').toISOString(),
             public_metrics: {
               retweet_count: 23,
               reply_count: 15,
               like_count: 156
             }
           },
           {
             id: '3',
             text: 'Omnia Os uses artificial intelligence to help online daters break the digital ice',
             created_at: new Date('2024-07-30T07:15:00Z').toISOString(),
             public_metrics: {
               retweet_count: 45,
               reply_count: 28,
               like_count: 234
             }
           },
           {
             id: '4',
             text: 'Amor vincit omnia 🧿\n\nOmnia 🧿',
             created_at: new Date('2024-07-29T16:45:00Z').toISOString(),
             public_metrics: {
               retweet_count: 18,
               reply_count: 12,
               like_count: 123
             }
           },
           {
             id: '5',
             text: 'Omnians, unite. A new era of AI-powered expression starts now. !',
             created_at: new Date('2024-07-28T14:20:00Z').toISOString(),
             public_metrics: {
               retweet_count: 34,
               reply_count: 22,
               like_count: 189
             }
           },
           {
             id: '6',
             text: 'Good morning, X community!',
             created_at: new Date('2024-07-28T09:00:00Z').toISOString(),
             public_metrics: {
               retweet_count: 5,
               reply_count: 8,
               like_count: 67
             }
           },
           {
             id: '7',
             text: 'Hello everyone',
             created_at: new Date('2024-07-27T12:30:00Z').toISOString(),
             public_metrics: {
               retweet_count: 3,
               reply_count: 6,
               like_count: 45
             }
           }
         ],
                   includes: {
             users: [
               {
                 id: 'omniaosdotfun',
                 name: 'OmniaOS',
                 username: 'omniaosdotfun',
                 profile_image_url: '/image.png',
                 verified: true
               }
             ]
           }
      };

      const user = mockData.includes?.users?.[0];
      if (!user) {
        throw new Error('User data not found');
      }

      const processedTweets: Tweet[] = mockData.data.map((tweet) => ({
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
             // Fallback to real tweets if API fails
       setTweets([
         {
           id: 'fallback-1',
           type: 'tweet',
                        user: {
               name: 'Omnia Os',
               handle: '@omniaosdotfun',
               avatar: '/image.png',
               verified: true
             },
           content: 'Ai dating assistant \n\nSay goodbye to feeling tongue tied !\n\nLOVE',
           timestamp: '2h',
           likes: 156,
           retweets: 23,
           replies: 15
         }
       ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const refreshTweets = () => {
    fetchTweets();
  };

  return {
    tweets,
    loading,
    error,
    refreshTweets
  };
}; 