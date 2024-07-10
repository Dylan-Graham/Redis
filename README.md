# Does Redis caching speed-up slow APIs?


## Results

### Load test on /users endpoint (no Redis)

Environment: 1 CPU, 1.75 Gb

```
(base) user@Users-MacBook-Air performance % k6 run load-test-users.js

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: load-test-users.js
        output: -

     scenarios: (100.00%) 1 scenario, 200 max VUs, 5m30s max duration (incl. graceful stop):
              * default: Up to 200 looping VUs for 5m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 3.5 GB 12 MB/s
     data_sent......................: 255 kB 848 B/s
     http_req_blocked...............: avg=300.04µs min=3µs     med=322.5µs max=10.07ms  p(90)=369µs   p(95)=396µs 
     http_req_connecting............: avg=224.72µs min=0s      med=247µs   max=8.74ms   p(90)=282.9µs p(95)=300µs 
     http_req_duration..............: avg=15.39s   min=93.58ms med=18s     max=26.37s   p(90)=21.69s  p(95)=22.8s 
       { expected_response:true }...: avg=15.39s   min=93.58ms med=18s     max=26.37s   p(90)=21.69s  p(95)=22.8s 
     http_req_failed................: 0.00%  ✓ 0        ✗ 2992 
     http_req_receiving.............: avg=12.43s   min=52.67ms med=15.05s  max=20.07s   p(90)=17.21s  p(95)=17.82s
     http_req_sending...............: avg=687.53µs min=11µs    med=40µs    max=476.14ms p(90)=63µs    p(95)=73µs  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s    
     http_req_waiting...............: avg=2.96s    min=39.41ms med=2.58s   max=10.28s   p(90)=5.65s   p(95)=7.35s 
     http_reqs......................: 2992   9.948749/s
     iteration_duration.............: avg=16.39s   min=1.09s   med=19.01s  max=27.37s   p(90)=22.7s   p(95)=23.8s 
     iterations.....................: 2992   9.948749/s
     vus............................: 3      min=3      max=200
     vus_max........................: 200    min=200    max=200
```

TLDR
```
VUs: 200
Time: 5 minutes
Request: avg=15.39s   min=93.58ms med=18s     max=26.37s   p(90)=21.69s  p(95)=22.8s     
```

### Load test on /users-redis endpoint (with Redis)

Environment: 1 CPU, 1.75 Gb

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: load-test-users-redis.js
        output: -

     scenarios: (100.00%) 1 scenario, 200 max VUs, 5m30s max duration (incl. graceful stop):
              * default: Up to 200 looping VUs for 5m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 6.5 GB 22 MB/s
     data_sent......................: 506 kB 1.7 kB/s
     http_req_blocked...............: avg=21.22µs min=2µs     med=6µs     max=7.08ms   p(90)=9µs     p(95)=21µs   
     http_req_connecting............: avg=10.26µs min=0s      med=0s      max=1.46ms   p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=7.77s   min=61.34ms med=8.88s   max=15.07s   p(90)=9.71s   p(95)=10.52s 
       { expected_response:true }...: avg=7.77s   min=61.34ms med=8.88s   max=15.07s   p(90)=9.71s   p(95)=10.52s 
     http_req_failed................: 0.00%  ✓ 0         ✗ 5559 
     http_req_receiving.............: avg=44.91ms min=17.62ms med=41.16ms max=536.11ms p(90)=51.24ms p(95)=61.79ms
     http_req_sending...............: avg=29.27µs min=5µs     med=26µs    max=2.17ms   p(90)=37µs    p(95)=47µs   
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=7.73s   min=24.98ms med=8.84s   max=14.92s   p(90)=9.67s   p(95)=10.46s 
     http_reqs......................: 5559   18.497289/s
     iteration_duration.............: avg=8.77s   min=1.06s   med=9.89s   max=16.07s   p(90)=10.71s  p(95)=11.53s 
     iterations.....................: 5559   18.497289/s
     vus............................: 3      min=3       max=200
     vus_max........................: 200    min=200     max=200

TLDR
```
VUs: 200
Time: 5 minutes
Request: avg=7.77s   min=61.34ms med=8.88s   max=15.07s   p(90)=9.71s   p(95)=10.52s
Requests Completed: 5559     
```

### Load test on /user endpoint (M1 Macbook Air)

Environment: M1 Macbook Air (ideally we should test on a basic tier cloud instance)
```
(base) user@Users-MacBook-Air performance % k6 run load-test-users.js 

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: load-test-users.js
        output: -

     scenarios: (100.00%) 1 scenario, 200 max VUs, 5m30s max duration (incl. graceful stop):
              * default: Up to 200 looping VUs for 5m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 5.1 GB 17 MB/s
     data_sent......................: 372 kB 1.2 kB/s
     http_req_blocked...............: avg=296.08µs min=1µs     med=311µs  max=9.05ms   p(90)=396µs  p(95)=451µs 
     http_req_connecting............: avg=218.56µs min=0s      med=234µs  max=8.61ms   p(90)=292µs  p(95)=329µs 
     http_req_duration..............: avg=10.2s    min=60.37ms med=11.61s max=17.93s   p(90)=14.42s p(95)=15.3s 
       { expected_response:true }...: avg=10.2s    min=60.37ms med=11.61s max=17.93s   p(90)=14.42s p(95)=15.3s 
     http_req_failed................: 0.00%  ✓ 0         ✗ 4364 
     http_req_receiving.............: avg=8.95s    min=33.83ms med=10.16s max=16.14s   p(90)=12.65s p(95)=13.41s
     http_req_sending...............: avg=262.01µs min=7µs     med=42µs   max=139.57ms p(90)=69µs   p(95)=84µs  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s     max=0s       p(90)=0s     p(95)=0s    
     http_req_waiting...............: avg=1.25s    min=25.25ms med=1.33s  max=3.44s    p(90)=2.03s  p(95)=2.24s 
     http_reqs......................: 4364   14.529247/s
     iteration_duration.............: avg=11.2s    min=1.06s   med=12.62s max=18.94s   p(90)=15.42s p(95)=16.3s 
     iterations.....................: 4364   14.529247/s
     vus............................: 3      min=3       max=200
     vus_max........................: 200    min=200     max=200


running (5m00.4s), 000/200 VUs, 4364 complete and 0 interrupted iterations
default ✓ [======================================] 000/200 VUs  5m0s
```

TLDR
```
VUs: 200
Time: 5 minutes
Request: avg=10.2s    min=60.37ms med=11.61s max=17.93s   p(90)=14.42s p(95)=15.3s
Requests Completed: 4364  
```

### Load test on /user-redis endpoint (with Redis) (M1 Macbook Air)

(base) dylangraham@Dylans-MacBook-Air performance % k6 run load-test-users-redis.js

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: load-test-users-redis.js
        output: -

     scenarios: (100.00%) 1 scenario, 200 max VUs, 5m30s max duration (incl. graceful stop):
              * default: Up to 200 looping VUs for 5m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 6.8 GB 23 MB/s
     data_sent......................: 529 kB 1.8 kB/s
     http_req_blocked...............: avg=17.45µs  min=1µs     med=6µs     max=1ms    p(90)=8µs      p(95)=14µs    
     http_req_connecting............: avg=8.96µs   min=0s      med=0s      max=495µs  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=7.37s    min=62.26ms med=8.88s   max=11.63s p(90)=9.95s    p(95)=10.13s  
       { expected_response:true }...: avg=7.37s    min=62.26ms med=8.88s   max=11.63s p(90)=9.95s    p(95)=10.13s  
     http_req_failed................: 0.00%  ✓ 0         ✗ 5809 
     http_req_receiving.............: avg=115.17ms min=33.87ms med=49.49ms max=2.09s  p(90)=103.36ms p(95)=473.71ms
     http_req_sending...............: avg=27.18µs  min=7µs     med=26µs    max=602µs  p(90)=35µs     p(95)=43µs    
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=7.25s    min=24.55ms med=8.81s   max=10.74s p(90)=9.8s     p(95)=9.99s   
     http_reqs......................: 5809   19.326915/s
     iteration_duration.............: avg=8.37s    min=1.06s   med=9.88s   max=12.63s p(90)=10.95s   p(95)=11.14s  
     iterations.....................: 5809   19.326915/s
     vus............................: 3      min=3       max=200
     vus_max........................: 200    min=200     max=200


TLDR
```
VUs: 200
Time: 5 minutes
Request: avg=7.37s    min=62.26ms med=8.88s   max=11.63s p(90)=9.95s    p(95)=10.13s
Requests Completed: 5809 
```
