# cs-isr

Crazy Simple Incremental Static Regeneration



## Roadmap

* [ ] `isr.config.js` for configuration options (per project)
  
  - [ ] `appSecretId` to authentify apps (webhook-related security)
  
  - [ ] `appPublicId` to identify apps

- [ ] single webhook service/server for all projects
  
  - [ ] receives the processing request
  
  - [ ] queues it (w/ FCFS deduplication)
  
  - [ ] UoW can trigger processing at will (usually behind a CRON)

- [ ] CRON-ready processing
  
  - [ ] payload is a list of URIs/pages to generate

- [ ] Page generation engines
  
  - [ ] Common stack (e.g. Nuxt, Next)
  
  - [ ] Allow custom stacks
