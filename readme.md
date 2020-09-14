# juice server 

Need to inline css for emails? but you're api is not in node?

 Add following to your docker-compose: 

    juice-server:
        restart: unless-stopped
        image: lkarolewski/juice-server:latest

now `POST` your html as `text/plain` to http://juice-server:3000/inline-css and get html with inlined css back!

you're welcome