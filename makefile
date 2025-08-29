create:
	docker build . -t vue_user_directory
delete:
	docker rmi vue_user_directory
run:
	docker run -d -p 3000:80 --rm --name vue_user_directory_container vue_user_directory
stop:
	docker stop vue_user_directory_container