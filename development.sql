create schema musics;
use music;

create table users (
	user_id int not null primary key auto_increment,
    username varchar(100) not null,
    password varchar(100) not null,
    email varchar(100) not null,
    reg_date datetime not null,
    profile_image longblob
);

create table post (
	post_id int not null primary key auto_increment,
    title varchar(100) not null,
    post_date datetime not null,
    content varchar(10000),
    img1 longblob,
    img2 longblob,
    img3 longblob,
    img4 longblob,
    likes int,
    user_id int not null,
    category varchar(45),
    tag varchar(45),
    foreign key(user_id) references users(user_id)
);

create table chord (
	chord_id int not null primary key auto_increment,
    title varchar(100) not null,
    post_date datetime not null,
    img_chord longblob,
    img_note longblob,
    artist varchar(100),
    song_key varchar(10),
    Bpm int,
    url varchar(100),
    img longblob,
    likes int,
    user_id int,
	type varchar(45),
    country varchar(45),
    foreign key(user_id) references users(user_id)
);

create table comments (
	comment_id int not null primary key auto_increment,
    context varchar(10000) not null,
    comment_date datetime not null,
    user_id int not null,
    post_id int not null,
    foreign key(user_id) references users(user_id),
    foreign key(post_id) references post(post_id)
);

create table follow (
	following_id int not null,
    follower_id int not null,
    primary key(following_id, follower_id),
    foreign key(following_id) references users(user_id),
    foreign key(follower_id) references users(user_id)
);


create table save_post (
    user_id int not null,
	post_id int not null,
	primary key(user_id, post_id),
    foreign key(user_id) references users(user_id),
    foreign key(post_id) references post(post_id)
);


create table like_post (
    user_id int not null,
	post_id int not null,
	primary key(user_id, post_id),
    foreign key(user_id) references users(user_id),
    foreign key(post_id) references post(post_id)
);

create table like_chord (
    user_id int not null,
	chord_id int not null,
	primary key(user_id, chord_id),
    foreign key(user_id) references users(user_id),
    foreign key(chord_id) references chord(chord_id)
);
