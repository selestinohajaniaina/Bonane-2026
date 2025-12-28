// Remplace par ton projet
const SUPABASE_URL = 'https://szkokrqudzizxqypqbej.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TeLXcZe6lD2ZwtmRqJF7Qg_h6XnqS8j';
const TABLE = 'Messages';

async function load() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}?select=*`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      }
    });
    const data = await res.json();
    console.log('Tous les Messages:',data); // tableau des messages
    return data;
  } catch (err) {
    console.error('Erreur load messages:', err);
    return [];
  }
}

async function save(obj) {
  try {
    const _obj = JSON.stringify(obj);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: _obj
    });
    // const data = await res.json();
    console.log('Message sauvegardé:', res);
    return res;
  } catch (err) {
    console.error('Erreur save message:', err);
  }
}
