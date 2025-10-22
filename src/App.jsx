import { useEffect, useState } from 'react'
import './App.css'

// Small Veni-Vici app using TheCatAPI (https://thecatapi.com)
// - Fetches a random cat image + breed info
// - Displays one result at a time (image + 3 consistent attributes)
// - Allows banning a breed by clicking the breed value; ban list shown and enforced

function App() {
  // current result from API
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ban list stores banned breed names (strings)
  const [bannedBreeds, setBannedBreeds] = useState([])
  const [breedsList, setBreedsList] = useState([])

  // Helper: pick a random item from array
  function sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  // Fetch a random cat image with breed information.
  // Use the /breeds endpoint to ensure we have breed metadata and then fetch an image
  async function fetchRandomCat(retries = 8) {
    setLoading(true)
    setError(null)
    try {
      if (!breedsList || breedsList.length === 0) {
        // If breeds list not loaded yet, fetch it now
        const r = await fetch('https://api.thecatapi.com/v1/breeds')
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const list = await r.json()
        setBreedsList(list)
      }

      // Filter breeds by ban list (ban entries can be breed name or origin)
      const available = (breedsList && breedsList.length > 0 ? breedsList : []).filter((b) => {
        const name = b.name || ''
        const origin = b.origin || ''
        return !bannedBreeds.includes(name) && !bannedBreeds.includes(origin)
      })

      if (!available || available.length === 0) {
        setError('No breeds available to show. Remove some bans.')
        setResult(null)
        setLoading(false)
        return
      }

      // Try a few times to fetch an image for a random available breed
      for (let attempt = 0; attempt < retries; attempt++) {
        const breed = sample(available)

        // Try to get an image for this breed. Some breed objects include an image url directly.
        let imageUrl = breed.image && breed.image.url ? breed.image.url : null

        if (!imageUrl) {
          const imgRes = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=1`)
          if (!imgRes.ok) {
            // try another breed
            continue
          }
          const imgData = await imgRes.json()
          if (Array.isArray(imgData) && imgData.length > 0 && imgData[0].url) {
            imageUrl = imgData[0].url
          }
        }

        if (!imageUrl) {
          // no image for this breed, try another
          continue
        }

        const attributes = {
          breed: breed.name || 'Unknown',
          origin: breed.origin || 'Unknown',
          temperament: breed.temperament ? breed.temperament.split(',')[0].trim() : 'Unknown',
        }

        setResult({
          id: breed.id,
          url: imageUrl,
          attributes,
        })

        setLoading(false)
        return
      }

      setError('Could not find an image for available breeds. Try again.')
      setResult(null)
      setLoading(false)
    } catch (err) {
      setError(String(err))
      setLoading(false)
      setResult(null)
    }
  }

  // click handler to toggle ban for breed attribute
  function toggleBanBreed(breedName) {
    setBannedBreeds((prev) => {
      if (prev.includes(breedName)) return prev.filter((b) => b !== breedName)
      return [...prev, breedName]
    })
  }

  // On mount, fetch an initial cat
  useEffect(() => {
    // load breeds list once on mount
    let mounted = true
    ;(async () => {
      try {
        const r = await fetch('https://api.thecatapi.com/v1/breeds')
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const list = await r.json()
        if (mounted) setBreedsList(list)
      } catch (err) {
        // don't block the app — fetchRandomCat will also attempt to load breeds when needed
        console.warn('Failed to load breeds list', err)
      }
    })()

    // fetch initial result after breeds list loads (small timeout to allow list to set)
    const t = setTimeout(() => fetchRandomCat(), 300)
    return () => {
      mounted = false
      clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app-root">
      <header>
        <h1>Veni Vici!</h1>
      </header>

      <main>
        <div className="card overlay">
          <p>Discover cats from your wildest dreams!</p>

          {error && <div className="error">{error}</div>}

          {result && (
            <div className="result card">
              <h2 className="breed" title="Click to ban/unban" onClick={() => toggleBanBreed(result.attributes.breed)}>
                {result.attributes.breed}
              </h2>

              <div className="pills">
                <button className="attr pill" onClick={() => {}}>{result.attributes.origin}</button>
                <button className="attr pill" onClick={() => {}}>{result.attributes.temperament}</button>
                <button className="attr pill" onClick={() => {}}>{result.id}</button>
              </div>

              <img src={result.url} alt={result.attributes.breed} />
            </div>
          )}

          {!result && !loading && !error && (
            <div className="empty">Choose Discover to start</div>
          )}

          <div className="controls">
            <button onClick={() => fetchRandomCat()} disabled={loading}>
              {loading ? 'Loading...' : 'Discover!'}
            </button>
          </div>

          <p className="hint">Click the breed name to add/remove it from the ban list.</p>
        </div>

        <aside className="ban-list">
          <strong>Ban List</strong>
          <div style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem'}}>Select an attribute in your listing to ban it</div>
          {bannedBreeds.length === 0 ? (
            <span className="none"> — none —</span>
          ) : (
            <ul>
              {bannedBreeds.map((b) => (
                <li key={b}>
                  <button className="pill" onClick={() => toggleBanBreed(b)}>{b}</button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>

    </div>
  )
}

export default App
