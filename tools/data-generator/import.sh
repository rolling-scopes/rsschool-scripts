mongoimport --host mongodb --port 27017 --db rsschool --jsonArray --mode upsert --type json --collection users /tmp/out/users.json
mongoimport --host mongodb --port 27017 --db rsschool --jsonArray --mode upsert --type json --collection courses /tmp/out/courses.json
mongoimport --host mongodb --port 27017 --db rsschool --jsonArray --mode upsert --type json --collection coursestudents /tmp/out/coursestudents.json
mongoimport --host mongodb --port 27017 --db rsschool --jsonArray --mode upsert --type json --collection coursementors /tmp/out/coursementors.json
