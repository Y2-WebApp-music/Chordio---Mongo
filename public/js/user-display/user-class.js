export default class User {
    constructor(user_id, username, email, profile_image, num_posts, num_chords) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.profile_image = profile_image;
        this.num_posts = num_posts;
        this.num_chords = num_chords;
    }
}