docker-compose up -d postgres

docker-compose ps
docker ps
docker inspect id

docker-compose down postgres

docker-compose exec postgres bash
psql -h localhost -d my_store -U nico

\d+

\q
exit