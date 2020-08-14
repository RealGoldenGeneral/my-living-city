const db = require('../db/models/index');
const Idea = db.Idea; 
//going to delete this soon but the server is temporarily unavailable
const Vote = db.Vote; 
const User = db.User;
const Rating = db.Rating;
const Sequelize = db.Sequelize;
const { Op } = require('sequelize');

// GET /:category/idea/:id
const getIdeasByCategory = async function(req, res) {
  try{
    if(req.params.category === 'Nature' && req.params.sort === 'new'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
        { 
          association: 'developer',
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]}
      ],
      where: {active: true, category: 'Nature'},
      offset: req.params.offset,
      limit: 50,
      order: [['createdAt', 'DESC']]
      }).catch((err) => {
        throw err;
      });
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      res.send(ideas);
    } else if (req.params.category === 'Community' && req.params.sort === 'new'){
        var dbIdeas = await Idea.findAll({
          include: [{
            model: User,
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
            ]},
          { 
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
            ]}
        ],
        where: {active: true, category: 'Community'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
        }).catch((err) => {
          throw err;
        });
        var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
        res.send(ideas);      
    } else if (req.params.category === 'Arts' && req.params.sort === 'new'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
        { 
          association: 'developer',
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]}
      ],
      where: {active: true, category: 'Arts'},
      offset: req.params.offset,
      limit: 50,
      order: [['createdAt', 'DESC']]
      }).catch((err) => {
        throw err;
      });
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      res.send(ideas);      
    } else if(req.params.category === 'Energy' && req.params.sort === 'new'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
        { 
          association: 'developer',
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]}
      ],
      where: {active: true, category: 'Energy'},
      offset: req.params.offset,
      limit: 50,
      order: [['createdAt', 'DESC']]
      }).catch((err) => {
        throw err;
      });
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      res.send(ideas);
    } else if(req.params.category === 'Manufacturing' && req.params.sort === 'new'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
        { 
          association: 'developer',
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]}
      ],
      where: {active: true, category: 'Manufacturing'},
      offset: req.params.offset,
      limit: 50,
      order: [['createdAt', 'DESC']]
      }).catch((err) => {
        throw err;
      });
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      res.send(ideas);  
    } else if(req.params.category === 'Nature' && req.params.sort === 'trending'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true, category: 'Nature'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      ideas.sort((a,b) => {
        if (a.positiveCount - a.negativeCount > b.positiveCount - b.negativeCount) {
          return 1;
        }
        if (a.positiveCount - a.negativeCount < b.positiveCount - b.negativeCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);
    } else if(req.params.category === 'Community' && req.params.sort === 'trending'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true, category: 'Community'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      ideas.sort((a,b) => {
        if (a.positiveCount - a.negativeCount > b.positiveCount - b.negativeCount) {
          return 1;
        }
        if (a.positiveCount - a.negativeCount < b.positiveCount - b.negativeCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);
    } else if(req.params.category === 'Arts' && req.params.sort === 'trending'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true, category: 'Arts'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      ideas.sort((a,b) => {
        if (a.positiveCount - a.negativeCount > b.positiveCount - b.negativeCount) {
          return 1;
        }
        if (a.positiveCount - a.negativeCount < b.positiveCount - b.negativeCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);
    } else if(req.params.category === 'Energy' && req.params.sort === 'trending'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true, category: 'Energy'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      ideas.sort((a,b) => {
        if (a.positiveCount - a.negativeCount > b.positiveCount - b.negativeCount) {
          return 1;
        }
        if (a.positiveCount - a.negativeCount < b.positiveCount - b.negativeCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);
    } else if(req.params.category === 'Manufacturing' && req.params.sort === 'trending'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true, category: 'Manufacturing'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      ideas.sort((a,b) => {
        if (a.positiveCount - a.negativeCount > b.positiveCount - b.negativeCount) {
          return 1;
        }
        if (a.positiveCount - a.negativeCount < b.positiveCount - b.negativeCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);
    } else {
      throw 'Invalid category';
    }
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack
      },
    });
  }
}


// GET /ideas/:sort/:offset
const getIdeas = async function (req, res) {
  try {
    if (req.params.sort === 'new') {
      var dbIdeas = await Idea.findAll({
        include: [{
            model: User,
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
            ]},
          { 
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
            ]}
        ],
        where: {active: true},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      res.send(ideas);
    } else if (req.params.sort === 'trending') {
     var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      ideas.sort((a,b) => {
        return a.rating.totalAverage - b.rating.totalAverage;
        /*
        if (a.rating.totalAverage > b.rating.totalAverage) {
          return 1;
        }
        if (a.rating.totalAverage < b.rating.totalAverage) {
          return -1;
        }
        return 0;
        */
      }).reverse();
      res.send(ideas);

    // Not really a sort but gets only ideas the user has interacted with.
    // Stuck it here because the route is the same format.
    // Also I felt this query was too complicated to do with sequelize so that's why
    // it's a raw query instead.
    } else if (req.params.sort === 'interacted') {
      [dbIdeas, metadata] = await db.sequelize.query(
        'SELECT DISTINCT "Ideas".*, "Users".fname, "Users".lname, developer.fname AS developer_fname, developer.lname AS developer_lname FROM "Votes" JOIN "Ideas" ON "Votes"."IdeaId" = "Ideas".id LEFT OUTER JOIN "Comments" ON "Ideas".id = "Comments"."IdeaId" JOIN "Users" ON "Ideas"."UserId" = "Users".id LEFT OUTER JOIN "Users" AS "developer" ON "Ideas"."developerId" = "Users".id WHERE ("Ideas"."UserId" = ' + req.session.user.id + ' OR "Votes"."UserId" = ' + req.session.user.id + 'OR "Comments"."UserId" = ' + req.session.user.id + ') AND "Ideas".active = true ORDER BY "updatedAt" OFFSET ' + req.params.offset + 'ROWS FETCH NEXT 50 ROWS ONLY'
      ).catch((err) => {throw err;});
      dbIdeas.map(idea => {
        idea.User = {};
        idea.User.fname = idea.fname;
        idea.User.lname = idea.lname;
        delete idea.fname;
        delete idea.lname;
        if (idea.developerId !== null) {
          idea.developer = {};
          idea.developer.fname = idea.developer_fname;
          idea.developer.lname = idea.developer_lname;
        } else { 
          idea.developer = null;
        }
        delete idea.developer_fname;
        delete idea.developer_lname;
        return idea;
      });
      var ideas = await Promise.all(dbIdeas.map(idea => addRatings(req.session, idea))) 
      res.send(ideas);
    } else {
      throw "invalid sort method";
    }
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack
      },
    });
  }
}

// Adds the user ratings to an idea object
const addRatings = async (session, idea) => {

  var averageRating = await Rating.findOne({
    attributes: [[Sequelize.fn('AVG', 
      Sequelize.col('rating')), 'average'
    ]],
    group: ['IdeaId'],
    where: {'IdeaId': idea.id},
    raw: true
  }).then((success) => {
    if (success) {
      return success.average;
    } else {
      return 0;
    }
  });

  var votes = await Rating.findAll({
    attributes: ['rating', [Sequelize.fn('COUNT', 
      Sequelize.col('*')), 'count'
    ]],
    group: ['rating'],
    where: {'IdeaId': idea.id},
    order: [['rating', 'ASC']],
    raw: true
  }).then((success) => {
    var queryVotes = {
      "10": "0",
      "9": "0",
      "8": "0",
      "7": "0",
      "6": "0",
      "5": "0",
      "4": "0",
      "3": "0",
      "2": "0",
      "1": "0"
    };
    success.map((value, id) => {
      queryVotes[value.rating] = value.count;
    });
    return queryVotes;
  });

  var posAverageRating = await Rating.findOne({
    attributes: [[Sequelize.fn('AVG', 
      Sequelize.col('rating')), 'average'
    ]],
    group: ['IdeaId'],
    where: {
      'IdeaId': idea.id,
      'rating': {
        [Op.gt]: 5
      }
    },
    raw: true
  }).then((success) => {
    if (success) {
      return success.average;
    } else {
      return 0;
    }
  });

  var negAverageRating = await Rating.findOne({
    attributes: [[Sequelize.fn('AVG', 
      Sequelize.col('rating')), 'average'
    ]],
    group: ['IdeaId'],
    where: {
      'IdeaId': idea.id,
      'rating': {
        [Op.lt]: 6
      }
    },
    raw: true
  }).then((success) => {
    if (success) {
      return success.average;
    } else {
      return 0;
    }
  });

  var interactivity = await Rating.count({ where: {'IdeaId': idea.id} });

  var positiveCount = await Rating.count({ 
    where: {
      'IdeaId': idea.id,
      'rating': {
        [Op.gt]: 5
      }
    } 
  });

  var negativeCount = await Rating.count({ 
    where: {
      'IdeaId': idea.id,
      'rating': {
        [Op.lt]: 6
      }
    } 
  });

  var ratio;
  if (positiveCount > 0 || negativeCount > 0) {
    ratio = positiveCount / (positiveCount + negativeCount);
  } else {
    ratio = 0;
  }

  var userDidRate = false
  if (session.user) {
    userDidRate = await Rating.findOne({
      where: {
        'IdeaId': idea.id,
        'UserId': session.user.id
      }
    }).then((success) => {
      if (success) {
        return true
      } else {
        return false
      }
    })
  }

  var userRating = 0
  if (userDidRate) {
    userRating = await Rating.findOne({
      where: {
        'IdeaId': idea.id,
        'UserId': session.user.id
      }
    }).then((success) => {
      if (success) {
        return success.rating
      } else {
        return 0
      }
    })
  }

  var rating = {
    totalAverage: averageRating,
    positiveAverage: posAverageRating,
    negativeAverage: negAverageRating,
    votes: votes,
    interactivity: interactivity,
    ratio: ratio,
    userDidRate: userDidRate,
    userRating: userRating
  };

  return {
    idea,
    positiveCount,
    negativeCount,
    rating
  }
} //end of addRatings function

// GET /idea/:id
const getSingleIdea = async function(req, res) {
  try {
    var dbIdea = await Idea.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: [
          ['fname', 'fname'],
          ['lname', 'lname']
        ]},
        {
        association: 'developer',
        attributes: [
          ['fname', 'fname'],
          ['lname', 'lname']
        ]}
      ],
    }).catch(err => {throw err;});
    var idea = await addRatings(req.session, dbIdea) 
    res.send(idea);
  } catch (e) {
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  }
};



// POST /ideas
const postIdea = (req, res) => {
  Idea.create({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    community_impact: req.body.community_impact,
    nature_impact: req.body.nature_impact,
    arts_impact: req.body.arts_impact,
    energy_impact: req.body.energy_impact,
    manufacturing_impact: req.body.manufacturing_impact,
    UserId: req.session.user.id
  }).then((idea) => {
    res.status(200).send(idea);
  }).catch((e) => {
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  });
};

// PUT /idea/:id
const editIdea = (req, res) => {
  Idea.findByPk(req.params.id).then(idea => {
    if (req.session.user.id != idea.UserId) {
      return res.status(401).send("Unauthorized");
    }
  });
  try {
    Idea.update({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      community_impact: req.body.community_impact, 
      nature_impact: req.body.nature_impact,
      arts_impact: req.body.arts_impact,
      energy_impact: req.body.energy_impact,
      manufacturing_impact: req.body.manufacturing_impact,
    }, { where: {id: req.params.id}});
    res.status(200).end();
  } catch(e){
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  }
};

// PUT /idea/:id (only state)
const updateIdea = async function(req, res) {
  try {
    await Idea.update({state: 'proposal'}, { where: {id: req.params.id}}).catch((err) => {throw err;});
    console.log(req.body.session);
    res.status(200).end();
  } catch(e){
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  }
};

// PUT /idea/ratio/:id (only ratio)
const updateRatio = async function(req, res) {
  try {
    await Idea.update({ratio: req.body.ratio}, { where: {id: req.params.id}}).catch((err) => {throw err;});
    res.status(200).end();
  } catch(e){
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  }
};



// DELETE /idea/:id
const deleteIdea = (req, res) => {
  Idea.findByPk(req.params.id).then(idea => {
    if (req.session.user.id != idea.UserId) {
      return res.status(401).send("Unauthorized");
    }
  });
  try {
    Idea.update({
      active: false
    }, { where: {id: req.params.id}});
    res.status(200).end();
  } catch(e){
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  }
};

const upvote = async function (req, res) {
  console.log("upvote was called");
  try {
    var existingVote = await Vote.findOne({ where: {UserId: req.session.user.id, IdeaId: req.params.id}});
    if (existingVote != null) {
      return res.status(409).json({
        errors: {
          error: 'You have already voted',
        },
      });
    } else {
      Vote.create({
        UserId: req.session.user.id,
        IdeaId: req.params.id,
        up: true
      }).catch((err) => {throw err;});

      // Did we transition to a proposal state?
      // COMMENTED IT OUT AS IT USES THE VOTE TABLE WHICH IS CURRENTLY DELETED
      // var upvoteCount = await Vote.count({ where: {'up': true, 'IdeaId': req.params.id} }).catch((err) => {throw err;});
      // var downvoteCount = await Vote.count({ where: {'down': true, 'IdeaId': req.params.id} }).catch((err) => {throw err;});

      if (positiveCount + negativeCount >= 50) {
        if (negativeCount == 0) { negativeCount = 1; } // avoid divide by zero
        if ((positiveCount/negativeCount * 100) >= 50) {
          Idea.update({state: 'proposal'}, { where: {id: req.params.id}}).catch((err) => {throw err;});
        }
      }//else if upvote over 100 => update state: collaborations
      //else  upvote over 500 => update state: project
      res.status(200).end();
    }
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack,
      }
    });
  }
};

const downvote = (req, res) => {
  try {
    Vote.findOne({ where: {UserId: req.session.user.id, IdeaId: req.params.id}})
    .then(existingVote => {
      if (existingVote != null) {
          return res.status(409).json({
              errors: {
                error: 'You have already voted on this idea',
              },
          });
      } else {
        Vote.create({
          UserId: req.session.user.id,
          IdeaId: req.params.id,
          down: true
        });
        res.status(200).end();
      }
    });
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack,
      }
    });
  }
};

getUpvoteCount = (req, res) => {
  Vote.count({ where: {'up': true, 'IdeaId': req.params.id} }).then(count => {
    res.status(200).send({'upvoteCount': count}); 
  });
};

getDownvoteCount = (req, res) => {
  Vote.count({ where: {'down': true, 'IdeaId': req.params.id} }).then(count => {
    res.status(200).send({'downvoteCount': count}); 
  });
};

// POST /idea/:id/rate
const rate = async function (req, res) {
  try {
    var existingRating = await Rating.findOne({ where: {UserId: req.session.user.id, IdeaId: req.params.id}});
    if (existingRating != null) {
      return res.status(409).json({
        errors: {
          error: 'You have already rated',
        },
      });
    } else {
      console.log(req.body.rating);
      Rating.create({
        UserId: req.session.user.id,
        IdeaId: req.params.id,
        rating: req.body.rating,
      }).catch((err) => {throw err;});

      var averageRating = await Rating.findOne({
        attributes: [[Sequelize.fn('AVG', 
          Sequelize.col('rating')), 'average'
        ]],
        group: ['IdeaId'],
        where: {'IdeaId': req.params.id},
        raw: true
      }).then((success) => {
        if (success) {
          return success.average;
        } else {
          return 0;
        }
      }).catch((err) => {throw err;});;

      console.log(averageRating);

      var minimumAverage = await Idea.findByPk(req.params.id)
      .then((success) => {
        if(success) {
          return success.ratio
        }
      }).catch((err) => {throw err;});

      console.log(minimumAverage);

      if (averageRating >= minimumAverage) {
        await Idea.update({
          status: 'pending'
        }, 
        {
          where: {
            id: req.params.id
          }
        }).catch((err) => {throw err;})
      }
      
      res.status(200).end();
    }
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack,
      }
    });
  }
};



// PUT /idea/:id/developer
const assignDeveloper = async function (req, res, next) {
  await Idea.findByPk(req.params.id).then(idea => {
    if (req.session.user.id != idea.UserId) {
      return res.status(401).send("Unauthorized");
    }
  }).catch((e) => { 
    return res.status(401).send("Unauthorized");
  });
  try {
    await Idea.update({
      developerId: req.body.developerId,
      state: 'collaboration',
    }, { where: {id: req.params.id}});
    res.status(200).end();
  } catch(e){
    return res.status(400).json({
      errors: {
        error: e.stack
      },
    });
  }
};

module.exports = {
  getIdeas,
  getSingleIdea,
  postIdea,
  getIdeasByCategory,
  editIdea,
  updateIdea,
  updateRatio,
  deleteIdea,
  upvote,
  downvote,
  rate,
  assignDeveloper,
};

