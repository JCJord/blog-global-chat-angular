export class UserDTO {
    private username!: string;
    private password!: string;
    private avatar!: string;
    
    setUsername(username: string): void {
        this.username = username;
    }

    setAvatar(avatar: string) {
        this.avatar = avatar;
    }

    getAvatar() {
        return this.avatar ;
    }

    getUsername(): string {
        return this.username;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    getPassword(): string {
        return this.password;
    }
}