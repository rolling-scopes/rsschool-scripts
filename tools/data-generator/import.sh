mongoimport --host mongodb --port 27017 --db rsschool --mode upsert --type csv --headerline --collection users /tmp/out/users.csv
mongoimport --host mongodb --port 27017 --db rsschool --mode upsert --type csv --headerline --collection courses /tmp/out/courses.csv
