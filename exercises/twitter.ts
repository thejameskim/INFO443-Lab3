/*
    From: https://leetcode.com/problems/design-twitter/ 
    Design a simplified version of Twitter where users can post tweets, 
    follow/unfollow another user and is able to see the 10 most recent tweets 
    in the user's news feed. 
    Your design should support the following methods:

    postTweet(userId, tweetId): Compose a new tweet.
    getNewsFeed(userId): Retrieve the 10 most recent tweet ids in the user's news feed. 
    Each item in the news feed must be posted by users who the user followed or by the user herself. 
    Tweets must be ordered from most recent to least recent.

    follow(followerId, followeeId): Follower follows a followee.

    unfollow(followerId, followeeId): Follower unfollows a followee.


    Example:

    twitter: Twitter = new Twitter();

    // User 1 posts a new tweet (id = 5).
    twitter.postTweet(1, 5);

    // User 1's news feed should return a list with 1 tweet id -> [5].
    twitter.getNewsFeed(1);

    // User 1 follows user 2.
    twitter.follow(1, 2);

    // User 2 posts a new tweet (id = 6).
    twitter.postTweet(2, 6);

    // User 1's news feed should return a list with 2 tweet ids -> [6, 5].
    // Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
    twitter.getNewsFeed(1);

    // User 1 unfollows user 2.
    twitter.unfollow(1, 2);

    // User 1's news feed should return a list with 1 tweet id -> [5],
    // since user 1 is no longer following user 2.
    twitter.getNewsFeed(1);
*/

const NEWS_FEED_SIZE = 10;

class Twitter {
    
    /** Initialize your data structure here. */
    constructor() {
        
    }
    
    /** Compose a new tweet. */
    public postTweet(userId: number, tweetId: number) {
        
    }
    
    /** Retrieve the NEWS_FEED_SIZE most recent tweet ids in the user's news feed. 
        Each item in the news feed must be posted by users who the user followed or by the user herself. 
        Tweets must be ordered from most recent to least recent. 
    */
    public getNewsFeed(userId: number): number[] {
        return [];
    }
    
    /** Follower follows a followee. If the operation is invalid, it should be a no-op. */
    public follow(followerId: number, followeeId: number) {
        
    }
    
    /** Follower unfollows a followee. If the operation is invalid, it should be a no-op. */
    public unfollow(followerId: number, followeeId: number) {
        
    }
}

// you can store your tweet in a linked-list-esque timeline, feel free to 
// not use this data structure tho
class Tweet {
    private data: string;
    private next: Tweet | null;
    constructor(private id: number) {
        this.data = "";
        this.next = null;
    }
}


/**
 * Your Twitter object will be instantiated and called as such:
 * let twitter: Twitter = new Twitter();
 * twitter.postTweet(userId,tweetId);
 * let newsfeed: number[] = twitter.getNewsFeed(userId);
 * twitter.follow(followerId,followeeId);
 * twitter.unfollow(followerId,followeeId);
 */