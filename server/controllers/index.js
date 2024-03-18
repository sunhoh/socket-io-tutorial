const Room = require('../schemas/room');

exports.renderMain = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
  //   const rooms =[
  //     {title:'test', password:false, max:10, owner:'#gbjnm12'},
  //     {title:'test', password:true, max:10, owner:'#dbdbd62'},
  //     {title:'test', password:true, max:10, owner:'#kjnmbnm99'},
  // ]
    // res.render('main', { rooms, title: 'GIF 채팅방' });
    res.json({ rooms, title: '채팅방' });

  } catch (error) {
    console.error(error);
    next(error);
  }
};
