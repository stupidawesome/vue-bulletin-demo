import Bulletin from '@/models/Bulletin.model'
import BulletinService from '@/services/Bulletin.service'

export default {
  name: 'Bulletin',
  data () {
    return {
      bulletin: new Bulletin(),
      loading: true
    }
  },
  computed: {
    filteredPosts () {
      return this.bulletin.posts.filter((post, index) => {
        return index < 10
      }).sort(function (a, b) {
        if (a.created < b.created) {
          return 1
        }
        if (a.created > b.created) {
          return -1
        }
        return 0
      })
    }
  },
  created () {
    this.listPosts()
  },
  methods: {
    listPosts () {
      this.loading = true
      this.bulletin = BulletinService.bulletin

      return BulletinService.list()
        .then(bulletin => {
          this.bulletin = bulletin
        })
        .catch(error => {
          this.error = error
        })
        .then(() => {
          this.loading = false
        })
    },

    createPost () {
      this.$router.push('post/create')
    },

    editPost (post) {
      this.$router.push(`post/edit/${post.id}`)
    },

    deletePost (post) {
      if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        this.loading = true
        BulletinService.deletePost(post.id)
          .then(() => this.listPosts())
          .catch(error => {
            this.error = error
          })
          .then(() => {
            this.loading = false
          })
      }
    },

    replyPost () {
      // Not implemented
    }
  }
}
