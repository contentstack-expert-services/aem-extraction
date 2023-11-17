## To run the script

1. Run `npm i`

2. Add the values of `AUTHORITY` and `COOKIE` in `/.env` file

3. Add the values of `routes` and `baseUrl` in `/config.json` file

4. To start extracting the data, run `npm start`

## Route's Directory structure

     [
         {
    	    "folder": "explore-blog",
    	    "files": ["ux-test-page", "running-shoe-guide"],
    	    "children": [
    		    {
    			    "folder": "explore-blog",
    			    "files": ["ux-test-page", "running-shoe-guide"],
    			    "children": [{},{}...]
    			 }
    	    ]
    	 },
    	 {
    	 ...
    	 }
    ]

## Warning

DO NOT COMMIT SENSITIVE INFO IN `/.env` and `/config.json` FILES
