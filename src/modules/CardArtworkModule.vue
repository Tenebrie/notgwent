<script>

export default {
	namespaced: true,
	state: {
		artworks: []
	},
	mutations: {
		register(state, value) {
			state.artworks.push(value)
		}
	}
}
</script>
