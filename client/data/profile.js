import profile_picture from '../assets/profile-picture.jpg';
import post1 from '../assets/post1.jpg';
import post2 from '../assets/post2.jpg';
import post3 from '../assets/post3.jpg';
import post4 from '../assets/img1.jpg';
import post5 from '../assets/img2.jpg';

export const profile = [{
    id:'Ea10-lite',
    username:"EA10-lite",
    name:"Anyigor Eanuel",
    profilePicture:profile_picture,
    posts:[
        {
            id:1,
            mediaUrls: [
                { type: 'image', url:post1 },
                { type: 'video', url: post3 }
            ],
            posterId:'EA10-lite',
            comments: [
                { 
                    comment: 'sunny days wouldnt be special if it wasnt for rain, joy wouldnt feel so good if it wasnt for pain',
                    commentBy: {
                        username : 'Manny_Ksq',
                        avatar: profile_picture
                    }
                },
            ],
            likes: [ 'EA10-lite', 'Zanietti', 'Sutton', 'Columbus' ]
        },
        {
            id:2,
            posterId: 'EA10-lite',
            mediaUrls: [ 
                { type: 'image', url: post4 },
                { type: 'image', url: post2 }
            ],
            comments: [
                { 
                    comment: 'Nature forces are so hard to study, but once you get a hand of one, you can easily get pass the other.',
                    commentBy: {
                        username : 'EA10-lite',
                        avatar: post5
                    }
                },
                { 
                    comment: 'Studying the forces of water currently',
                    commentBy: {
                        username : 'Manny_Ksq',
                        avatar: profile_picture
                    }
                },
            ],
            likes: [ 'Cephas', 'Kimmich', 'Sutton',],
            topic: 'studying all the forces of Nature.'
        },
        {
            id:3,
            posterId: 'EA10-lite',
            mediaUrls: [ 
                { type: 'image', url: post5 },
                { type: 'image', url: post1 }
            ],
            comments: [
                { 
                    comment: 'Nature forces are so hard to study, but once you get a hand of one, you can easily get pass the other.',
                    commentBy: {
                        username : 'EA10-lite',
                        avatar: post5
                    }
                },
                { 
                    comment: 'Studying the forces of water currently',
                    commentBy: {
                        username : 'Manny_Ksq',
                        avatar: profile_picture
                    }
                },
            ],
            likes: [ 'Cephas', 'Kimmich', 'Sutton',],
            topic: 'studying all the forces of Nature.'
        },
    ],
    followers:67,
    following:125,
    about_me:'A sucker for pain!!!',
}]