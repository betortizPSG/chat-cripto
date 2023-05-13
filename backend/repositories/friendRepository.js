const Friend = require('../models/friendModel');

class FriendRepository {
  static async sendFriendRequest(userId, friendId) {
    const friendRequest = new Friend({
      user: userId,
      friend: friendId
    });
    await friendRequest.save();
    return friendRequest;
  }

  static async getFriendRequests(userId) {
   const friendRequests = await Friend.find({
      friend: userId,
      status: 'pending'
    }).populate('user');
    return friendRequests;
  }

  static async acceptFriendRequest(requestId) {
    const friendRequest = await Friend.findByIdAndUpdate(requestId, {
      status: 'accepted'
    }, { new: true });
    return friendRequest;
  }

  static async rejectFriendRequest(requestId) {
    const friendRequest = await Friend.findByIdAndUpdate(requestId, {
      status: 'rejected'
    }, { new: true });
    return friendRequest;
  }

  static async getFriends(userId) {
    const friends = await Friend.find({
      $or: [
        { friend: userId, status: 'accepted' }
      ]
    }).populate('user friend');
    return friends;
  }
}

module.exports = FriendRepository;
