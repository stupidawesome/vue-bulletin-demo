import Post from '@/models/Post.model'
import BulletinService from '@/services/Bulletin.service'
import FormGroup from '@/models/FormGroup.model'
import FormControl from '@/models/FormControl.model'

export default {
  name: 'PostBuilder',
  data () {
    return {
      post: new Post(),
      form: new FormControl([
        new FormGroup('author', null, [FormControl.REQUIRED]),
        new FormGroup('title', null, [FormControl.REQUIRED]),
        new FormGroup('message', null, [FormControl.REQUIRED])
      ]),
      error: null,
      loading: false
    }
  },
  created () {
    this.loadPost(parseInt(this.$route.params.postId))
  },
  methods: {
    onSubmit () {
      this.form.setSubmitted(true)
      if (this.form.isValid()) {
        this.loading = true
        BulletinService
          .savePost(Post.create(Object.assign({}, this.post, this.form.getValue())))
          .then(() => this.$router.push('/'))
          .catch((error) => {
            this.error = error
          })
          .then(() => {
            this.loading = false
          })
      }
    },

    loadPost (postId) {
      this.loading = true
      return BulletinService.findPostById(postId)
        .then((post) => {
          if (post) {
            this.post = post
            this.form.setValue(post)
          }
        })
        .catch(() => {
          this.$router.push('/post/create')
        })
        .then(() => {
          this.loading = false
        })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.loadPost(parseInt(to.params.postId)).then(next)
  }
}
