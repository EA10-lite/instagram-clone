import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import avatar from '../assets/avatar.jpg';

export const posts = [
    {
        id:1,
        mediaUrls:[
            {type:"image", url:img1,id:1},
            {type:"image", url:img2,id:2},
            {type:"image", url:img3,id:3}
        ],
        topic:"Painting :)||",
        posterId:"chris",
        posterImg:"",
        comments:[

            {
                id: 4, 
                comment:"painting helps me calm down when i'm in distress, don't know what i'll do if painting was not of this world. Maybe i could've invented it during monet of distress.", 
                commentBy: {
                    avatar: img1,
                    username:"xlsinksy",
                },
            },
            {
                id: 5, 
                comment:"i gat a whole room to myself for painting.", 
                commentBy:{
                    username:"Emmanuel",
                    avatar: img2
                },
            },
            {
                id: 6, 
                comment:"the best thing life has offered so far so good.", 
                commentBy:{
                    avatar: img3,
                    username:"Lacazette",
                },
            },
        ],
        likes:['sutton007', 'J_zanetti', 'brother_nnit'],
    },
    {
        id:2,
        mediaUrls:[
            {type:"image", url:img4},
            {type:"image", url:img5},
        ],
        topic:"Nature",
        posterId:"ea10lite",
        posterImg:'',
        comments:[
            {
                id:1,
                comment: 'Nature blah blah blah.',
                commentBy: {
                    username:'EA10-lite',
                    avatar: img5,
                }
            }
        ],
        likes:['kings_meadow', 'xanthy', 'ramsey']
    },
    {
        id:3,
        mediaUrls:[
            {type:"image",url: img2},
        ],
        topic:"Art is the best feeling ever!!!",
        posterId:"Anyigor",
        posterImg:'',
        comments:[],
        likes:['Hamilton']
    },
    {
        id:4,
        mediaUrls:[
            {type:"image",url: img1},
        ],
        topic:"The Zone Where I really wanna be!",
        posterId:"sutton007",
        posterImg:avatar,
        comments:[],
        likes: ['Zanetti']
    },
    {
        id:5,
        mediaUrls:[
            {type:"video",url: img4},
        ],
        topic:"This feeling i am feeling inside",
        posterId:"J_zanetti",
        posterImg:'',
        comments:[],
        likes: ['Park', 'Colombus']
    },
    {
        id:6,
        mediaUrls:[
            {type:"image",url: img2},
            {type:"image",url: img3},
        ],
        topic:"Art is the best feeling ever!!!",
        posterId:"Anyigor",
        posterImg:'',
        comments:[],
        likes:['ea10-lite', 'bravoski']
    }
]