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
import { PriorityQueue } from "./ts-heap"

const NEWS_FEED_SIZE = 10;

class Twitter {
    private userMap: Map<number, User>;
    private timestamp = new Time();

    /** Initialize your data structure here. */
    constructor() {
        this.userMap = new Map<number, User>();
    }
    
    /** Compose a new tweet. */
    public postTweet(userId: number, message: string, tweetId: number, userName?: string) {
        if (!this.userMap.has(userId) && userName) {
            let newUser: User = new User(userId, userName);
            this.userMap.set(userId, newUser);
        }
        let name = this.userMap.get(userId)?.name
        if (name) {
            this.userMap.get(userId)?.post(tweetId, name, message, this.timestamp.time());
        }
    }
    
    /** Retrieve the NEWS_FEED_SIZE most recent tweet ids in the user's news feed. 
        Each item in the news feed must be posted by users who the user followed or by the user herself. 
        Tweets must be ordered from most recent to least recent. 
    */
    public getNewsFeed(userId: number): string[] {
        let result: string[] = [];

        if (!this.userMap.has(userId)) {
            return result;
        }
        let followedList= this.userMap.get(userId)?.following;
        let pq = new PriorityQueue();
        if (followedList) {
            for (let user of Array.from(followedList.values())) {
                let tweet = this.userMap.get(user)?.tweets;
                if (tweet != null) {
                    pq.insert(tweet, tweet.time);
                }
            }
            let numTweets: number = 0;
            while (pq.size() !== 0 && numTweets < NEWS_FEED_SIZE) {
                let tweet = pq.shift(true);
                if (tweet instanceof Array) {
                    result.push(" tweetID:" + tweet[0].id + " - " + tweet[0].name + " posted: " + tweet[0].data + " - at time " + tweet[0].time);
                    numTweets++;
                    if (tweet[0].next != null) {
                        pq.insert(tweet[0].next, tweet[0].next.time);
                    }
                }
            }
        }
        return result;
    }
    
    /** Follower follows a followee. If the operation is invalid, it should be a no-op. */
    public follow(followerId: number, followeeId: number, followerName?: string,  followeeName?: string) {
        if (!this.userMap.has(followerId) && followerName) {
            let newUser = new User(followerId, followerName);
            this.userMap.set(followerId, newUser);
        }
        if (!this.userMap.has(followeeId) && followeeName) {
            let newUser = new User(followeeId, followeeName);
            this.userMap.set(followeeId, newUser);
        }
        this.userMap.get(followerId)?.follow(followeeId);
    }
    
    /** Follower unfollows a followee. If the operation is invalid, it should be a no-op. */
    public unfollow(followerId: number, followeeId: number) {
        if (!this.userMap.has(followerId) || followerId == followeeId) {
            return
        }
        this.userMap.get(followerId)?.unfollow(followeeId);
    }
}

class Time {
    public counter: number = 0;
    public time() {
        return this.counter++;
    }
}

// you can store your tweet in a linked-list-esque timeline, feel free to 
// not use this data structure tho
class Tweet {
    public id: number;
    public name: string;
    public data: string;
    public next: Tweet | null;
    public time: number
    constructor(id: number, name: string, data: string, currentTime: number) {
        this.id = id;
        this.name = name;
        this.data = data;
        this.next = null;
        this.time = currentTime;
    }
}

class User {
    public id: number;
    public name: string;
    public tweets: Tweet | null;
    public following: Set<number>;

    constructor (id: number, name: string) {
        this.id = id;
        this.name = name;
        this.tweets = null;
        this.following = new Set();
        this.follow(id);
    }

    public follow(person: number) {
        this.following.add(person);
    }

    public unfollow(person: number) {
        this.following.delete(person);
    }

    public post(id: number, name: string, message: string, time: number) {
        let tweet: Tweet = new Tweet(id, name, message, time);
        tweet.next = this.tweets;
        this.tweets = tweet;
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
let twitter: Twitter = new Twitter();
twitter.postTweet(1, "hello", 1, "nam");
twitter.postTweet(2, "Hi Nam", 2, "bob");
twitter.follow(1, 2);
twitter.postTweet(1, "hello again", 3, "nam");
let newsfeed: string[] = twitter.getNewsFeed(1);
console.log(newsfeed);