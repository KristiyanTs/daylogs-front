<template>
  <footer class="footer">
    <div class="container">
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; 2019
            <a href="/" target="_blank">DayLogs</a>.
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <a
                href="https://www.moonhythe.com"
                class="nav-link"
                target="_blank"
                >Moonhythe</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://www.moonhythe.com/about"
                class="nav-link"
                target="_blank"
                >About Us</a
              >
            </li>
            <li class="nav-item">
              <a href="/blog" class="nav-link" target="_blank">Blog</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style scoped>
footer {
  color: white;
  background-image: linear-gradient(to right, #028090, #027381, #016572, #015964, #014c56);
}
footer a {
  color: white;
  font-weight: bold;
}
</style>
