# web-dev

This is the simple project of sign-in and sign-up form

Tech stach : HTML, SASS, JS(JQuery), PHP
Servers : MongoDB(primary), Redis

# After first successful login a token will be generated and stored in Redis and the local storage of the browser
# On every step of navigation, this tokens will be validated and if it fails, the user will be redirected to the login page
# This tokens can be used to authenticate the user on future visits of the web page without password
# These tokens are used for internal authentication

# In this project, the expiry for the token is set to 60 mins (1 hour) for the demo purpose

Sign-in UI
![image](https://user-images.githubusercontent.com/91783582/214272030-2e98d07c-3256-4f6c-9db2-bcac52d508ce.png)

Sign-up UI 
![image](https://user-images.githubusercontent.com/91783582/214272174-9b81b3f6-93a9-4609-a371-732c042fca70.png)

Dashboard UI
![image](https://user-images.githubusercontent.com/91783582/214272495-bec7980b-f34d-49dc-8c3c-ce0c43513787.png)

