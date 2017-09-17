import moment from 'moment'

export default {
  name: 'Post',
  props: ['post'],
  data () {
    return {
      isActionsOpen: false,
      now: Date.now()
    }
  },
  computed: {
    isAuthored () {
      return true
    },
    postDate () {
      const postMoment = moment(this.post.created, 'x')
      const date = moment(this.now)
      const daysSince = date.diff(postMoment, 'days')
      const hoursSince = date.diff(postMoment, 'hours')
      const minutesSince = date.diff(postMoment, 'minutes')

      let postDate
      if (daysSince > 0) {
        postDate = `${daysSince} day${daysSince > 1 ? 's' : ''} ago`
      } else if (hoursSince > 0) {
        postDate = `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`
      } else if (minutesSince > 0) {
        postDate = `${minutesSince} minute${minutesSince > 1 ? 's' : ''} ago`
      } else {
        postDate = 'a moment ago'
      }

      return postDate
    }
  },
  created () {
    this.startTimer()
  },
  methods: {
    edit () {
      this.$emit('onEdit', this.post)
    },
    remove () {
      this.$emit('onDelete', this.post)
    },
    reply () {
      this.$emit('onReply', this.post)
    },
    toggleActions () {
      this.isActionsOpen = !this.isActionsOpen
    },
    startTimer () {
      window.setInterval(() => {
        this.now = Date.now()
      }, 1000)
    }
  }
}
