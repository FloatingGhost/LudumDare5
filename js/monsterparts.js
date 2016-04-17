var stat_names = ["crazed", "slimy", "hairy", "spikey", "scaly", "smelly", "existential"];

/*
  {
    name: "",
    size: {x: , y:},
    cost: ,
    desc: "",
    img: "",
    stats: {
      crazed: ,
      slimy: ,
      hairy: ,
      spikey: ,
      scaly: ,
      smelly: ,
      existential: ,
    }, 
  },
*/

var monster_data = {
            eyes: [
                    {
                      name: "RedEye",
                      size: {x: 16, y:16},
                      desc: "The eyes that have seen hell",
                      cost: 10,
                      img: "eyes/RedEye.png",
                      stats: {
                        crazed: 30,
                        slimy: 10,
                        hairy: 0,
                        spikey: 10,
                        scaly: 0,
                        smelly: 5,
                        existential: 0,
                      },
                    },
                    { name: "Reptile Eyes",
                      size: {x: 16, y:16},
                      cost: 20,
                      desc: "Very snake-like",
                      img: "eyes/ReptileEyes.png",
                      stats: {
                        crazed: 20,
                        slimy: 20,
                        hairy: 0,
                        spikey: 5,
                        scaly: 20,
                        smelly: 5,
                        existential: 0,
                      },
                    },
                    { name: "Void Eyes",
                      cost: 12,
                      size: {x: 16, y:16},
                      desc: "Stare into the endless void",
                      img: "eyes/VoidEye.png",
                      stats: {
                        crazed: 0,
                        slimy: 0,
                        hairy: 0,
                        spikey: 0,
                        scaly: 0,
                        smelly: 0,
                        existential: 100,
                      },
                    },
                    {
                      name: "Big Blue",
                      size: {x:32 , y:32},
                      cost: 10,
                      desc: "Massive blue eyes",
                      img: "eyes/BigBlue.png",
                      stats: {
                        crazed: 15,
                        slimy: 15,
                        hairy: 0,
                        spikey: 0,
                        scaly: 0,
                        smelly: 0,
                        existential: 0,
                      }, 
                    }, 
                    {
                      name: "Fire Eye",
                      size: {x:32 , y:32},
                      cost: 20,
                      desc: "The fires of doom",
                      img: "eyes/FireEye.png",
                      stats: {  
                        crazed: 30,
                        slimy: 0,
                        hairy: 0,
                        spikey: 0,
                        scaly: 0,
                        smelly: 0,
                        existential: 10,
                      },        
                    },
                    {
                      name: "Pulsing Eye",
                      size: {x:16 , y:16},
                      cost: 10,
                      desc: "The pupils... they won't stop",
                      img: "eyes/eye-pulsing.png",
                      stats: {  
                        crazed: 20,
                        slimy: 10,
                        hairy: 0,
                        spikey: 0,
                        scaly: 0,
                        smelly: 0,
                        existential: 0,
                      },        
                    },
                    {
                      name: "Mr purple",
                      size: {x:16 , y:16},
                      cost: 10,
                      desc: "I don't want to see what this is attached to...",
                      img: "eyes/PurpleEye.png",
                      stats: {  
                        crazed: 20,
                        slimy: 15,
                        hairy: 0,
                        spikey: 0,
                        scaly: 0,
                        smelly: 10,
                        existential: 0,
                      },        
                    },
                  ],
    
            mouths: [
                      {
                        name: "Smiling Mouth",
                        desc: "Demonic laughter...",
                        size: {x:32, y:32},
                        cost: 25,
                        img: "mouths/Smiling_Mouth.png",
                        stats: {
                          crazed: 50,
                          slimy: 3,
                          hairy: 2,
                          spikey: 10,
                          scaly: 5,
                          smelly: 5,
                          existential: 0,
                        },
                      },
                      { name: "Spinning Mouth",
                        desc: "The blender of souls",
                        size: {x:32, y:32},
                        cost: 20,
                        img: "mouths/Spinning_Mouth.png",
                        stats: {
                          crazed: 100,
                          slimy: 0,
                          hairy: 0,
                          spikey: 100,
                          scaly: 0,
                          smelly: 0,
                          existential: 10,
                        },
                      },
                      { name: "Void Mouth", 
                        size: {x:32, y:32},
                        desc: "Fall into the void...",
                        img: "mouths/Void_Mouth.png",
                        cost: 50,
                        stats: {
                          crazed: 0,
                          slimy: 0,
                          hairy: 0,
                          spikey: 0,
                          scaly: 0,
                          smelly: 0,
                          existential: 50,
                        },
                      },
                      {
                      name: "Beak",
                      size: {x:32 , y:32},
                      cost: 20,
                      desc: "Quack quack",
                      img: "mouths/beak.png",
                      stats: {  
                        crazed: 5,
                        slimy: 0,
                        hairy: 0,
                        spikey: 20,
                        scaly: 0,
                        smelly: 10,
                        existential: 0,
                      },        
                    },
 
                    ],
            legs: [
                    {
                      name: "Hairy Leg",
                      desc: "Hairy as a hobbit",
                      size: {x:64, y:64},
                      cost: 15,
                      img: "limbs/Green-leg.png",
                      stats: {
                        crazed: 10,
                        slimy: 0,
                        hairy: 50,
                        spikey: 0,
                        scaly: 0,
                        smelly: 15,
                        existential: 0,
                      },
                    },
                    {
                      name: "Duck Leg",
                      size: {x:64 , y:64},
                      cost: 20,
                      desc: "Go find a lemonade stand",
                      img: "limbs/duck-leg.png",
                      stats: {  
                        crazed: 0,
                        slimy: 30,
                        hairy: 0,
                        spikey: 0,
                        scaly: 0,
                        smelly: 10,
                        existential: 0,
                      },        
                    },
                    {
                      name: "Old Jeans",
                      size: {x:64 , y:64},
                      cost: 20,
                      desc: "Not washed since 1965",
                      img: "limbs/Jeans.png",
                      stats: {  
                        crazed: 5,
                        slimy: 20,
                        hairy: 10,
                        spikey: 0,
                        scaly: 0,
                        smelly: 50,
                        existential: 0,
                      },        
                    },
                  ],
          arms: [
                  {
                      name: "The Claaaaw",
                      size: {x:64 , y:64},
                      cost: 20,
                      desc: "Ow, pointy",
                      img: "limbs/Claw.png",
                      stats: {  
                        crazed: 30,
                        slimy: 0,
                        hairy: 0,
                        spikey: 30,
                        scaly: 0,
                        smelly: 0,
                        existential: 0,
                      },        
                    },
                  {
                      name: "Green Arm",
                      size: {x:128 , y:64},
                      cost: 20,
                      desc: "Cosplay as the Grinch",
                      img: "limbs/Green-arm.png",
                      stats: {  
                        crazed: 5,
                        slimy: 0,
                        hairy: 30,
                        spikey: 0,
                        scaly: 0,
                        smelly: 30,
                        existential: 0,
                      },        
                    },

                    {
                      name: "Severed Arm",
                      size: {x:64 , y:64},
                      cost: 20,
                      desc: "Only a flesh wound",
                      img: "limbs/SpurtingArm.png",
                      stats: {  
                        crazed: 15,
                        slimy: 10,
                        hairy: 0,
                        spikey: 0,
                        scaly: 0,
                        smelly: 20,
                        existential: 10,
                      },        
                    },
                ],
              misc: [
                {
                      name: "Helicopter Hat",
                      size: {x:128 , y:128},
                      cost: 20,
                      desc: "It's a hat. WITH A HELICOPTER!",
                      img: "misc/Helicopterhat.png",
                      stats: {  
                        crazed: 50,
                        slimy: 0,
                        hairy: 0,
                        spikey: 10,
                        scaly: 0,
                        smelly: 0,
                        existential: 0,
                      },        
                    },
            ],
          };
        
