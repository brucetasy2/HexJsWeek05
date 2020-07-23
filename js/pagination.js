//  分頁

Vue.component('doNavigater', {
  template: `
  <div class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" @click.prvent="navipage(pages.current_page-1)">Previous</a>
      </li>

      <li class="page-item" :class="{'active': item == pages.current_page}" v-for="(item,inx) in pages.total_pages" :key="inx">
        <a class="page-link"  href="#" @click.prvent="navipage(item)">{{ item }} </a>
      </li>
      
      <li class="page-item">
        <a class="page-link" href="#" @click.prvent="navipage(pages.current_page+1)">Next</a>
      </li>
    </ul>
  </div> `,
  props: {
    pages: {

    },
  },

  methods: {
    navipage(targetPage) {
      console.log(`******** pagination.js(navipage) PAGE ${targetPage} ******`);
      this.$emit('gotopage', targetPage);
    },
  },
  mounted() {
    console.log(`******** pagination.js(mounted) ******`);
  },
});
