const router = require("express").Router();

const FriendController = require("../controller/friendController")
const { authMiddleware } = require("../middleware/authMiddleware");

router.post('/friend-requests/send',authMiddleware, FriendController.sendFriendRequest)
router.get('/friend-requests/:userId', FriendController.getFriendRequests)
router.put('/friend-requests/:requestId/accept',authMiddleware, FriendController.acceptFriendRequest)
router.put('/friend-requests/:requestId/reject',authMiddleware, FriendController.rejectFriendRequest)
router.get('/friend-requests/get-friends/:userId', FriendController.getFriends)

module.exports = router