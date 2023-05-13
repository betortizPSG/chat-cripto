const friendModel = require('../models/friendModel');
const FriendRepository = require('../repositories/friendRepository');
const ResponseUtils = require("../utils/ResponseUtils")

async function sendFriendRequest(req, res) {
  const { userId, friendId } = req.body;

  // Verifica se o usuário está tentando adicionar a si mesmo como amigo
  if (userId === friendId) {
    ResponseUtils.error(res, 400, "Você não pode adicionar você mesmo como amigo");
    return;
  }

  try {
    const checkUser = await friendModel.findOne({
      $or: [
        { user: userId, friend: friendId },
        { user: friendId, friend: userId }
      ]
    })

    if (checkUser) {
      if (checkUser.status === "accepted") {
        ResponseUtils.error(res, 400, "Esse usuário já é seu amigo");
      } else if (checkUser.status === "pending") {
        ResponseUtils.error(res, 400, "Já existe uma solicitação de amizade pendente para esse usuário");
      }
    } else {
      const friendRequest = await FriendRepository.sendFriendRequest(userId, friendId);
      res.status(201).json(friendRequest);
    }
  } catch (error) {
    console.error(error);
    ResponseUtils.error(res, 500, "Não foi possível enviar solicitação de amizade");
  }
}



async function getFriendRequests(req, res) {
  const userId = req.params.userId;
  try {
    const friendRequests = await FriendRepository.getFriendRequests(userId);
    res.status(200).json(friendRequests);
  } catch (error) {
    console.error(error);
    ResponseUtils.error(res, 500, "Não foi possivel pegar requisição de amizade")
  }
  return getFriendRequests;
}

async function acceptFriendRequest(req, res) {
  const requestId = req.params.requestId;
  try{
    const updatedRequest = await FriendRepository.acceptFriendRequest(requestId);
    res.status(200).json(updatedRequest)  
  }catch(error){
    console.log(error)
    ResponseUtils.error(res,500,"Não é possivel aceitar o amigo")
  }

  return acceptFriendRequest;
}

async function rejectFriendRequest(req, res) {
  const requestId = req.params.requestId
  try{
    const updatedRequest = await FriendRepository.rejectFriendRequest(requestId)
    res.status(200).json(updatedRequest)
  }catch(error){
    console.error(error)
    ResponseUtils.error(res, 500, "Não é possivel rejeitar amigo")
  }
  return rejectFriendRequest;
}

async function getFriends(req, res) {   
  const userId = req.params.userId
  try{
    const friendRequest = await FriendRepository.getFriends(userId)
    res.status(200).json(friendRequest)
  }catch(error){
    ResponseUtils.error(res, 500, "Não é possivel obter informações dos amigos")
  }
  return getFriends;
}

module.exports = {
    sendFriendRequest,
    getFriendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriends
}