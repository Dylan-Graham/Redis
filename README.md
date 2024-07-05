# Does Redis caching speed-up slow APIs?


## Results

### Load test on /users endpoint (no Redis)

Environment: M1 Macbook Air (ideally we should test on a basic tier cloud instance)
```
(base) dylangraham@Dylans-MacBook-Air performance % k6 run load-test-users.js 

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
```

### Load test on /users-redis endpoint (with Redis)