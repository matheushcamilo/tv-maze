# TVmaze API Endpoints

Here are the endpoints you can use to perform each of the tasks you mentioned:

1. **List all shows per page**:

   - Endpoint: `/shows?page=:num`
   - Example: `https://api.tvmaze.com/shows?page=1`
   - This endpoint returns a list of shows. You can control the page of results you get by replacing `:num` with the page number you want.

2. **List all seasons for a show**:

   - Endpoint: `/shows/:id/seasons`
   - Example: `https://api.tvmaze.com/shows/1/seasons`
   - This endpoint returns all seasons for a specific show. Replace `:id` with the ID of the show.

3. **List episodes per season**:

   - Endpoint: `/seasons/:id/episodes`
   - Example: `https://api.tvmaze.com/seasons/1/episodes`
   - This endpoint returns all episodes for a specific season. Replace `:id` with the ID of the season.

4. **Search shows by name**:

   - Endpoint: `/search/shows?q=:query`
   - Example: `https://api.tvmaze.com/search/shows?q=girls`
   - This endpoint returns shows whose name matches the provided search term. Replace `:query` with the search term.

5. **Search show by id**:

   - Endpoint: `/shows/:id`
   - Example: `https://api.tvmaze.com/shows/1`
   - This endpoint returns the show with the specified ID. Replace `:id` with the ID of the show.

6. **Search episode by id**:
   - Endpoint: `/episodes/:id`
   - Example: `https://api.tvmaze.com/episodes/1`
   - This endpoint returns the episode with the specified ID. Replace `:id` with the ID of the episode.
