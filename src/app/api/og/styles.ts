export const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050505',
    fontFamily: 'sans-serif',
    position: 'relative',
  } as const,
  backgroundMesh: {
    position: 'absolute',
    inset: 0,
    opacity: 0.2,
    filter: 'blur(100px)',
    transform: 'scale(1.5)',
  } as const,
  // Helper to merge dynamic gradient
  getBackgroundStyle: (gradient: string) => ({
    position: 'absolute',
    inset: 0,
    opacity: 0.2,
    filter: 'blur(100px)',
    transform: 'scale(1.5)',
    background: gradient,
  } as const),
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    zIndex: 10,
    marginBottom: '20px'
  } as const,
  emojiContainer: {
    width: '100px',
    height: '100px',
    borderRadius: '50px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '50px',
    boxShadow: '0 0 40px rgba(0,0,0,0.5)'
  } as const,
  title: {
    fontSize: '90px',
    fontWeight: 900,
    margin: 0,
    letterSpacing: '-3px',
    color: 'white',
    textShadow: '0 10px 30px rgba(0,0,0,0.5)'
  } as const,
  description: {
    fontSize: '36px',
    color: 'rgba(255,255,255,0.8)',
    marginTop: '10px',
    textAlign: 'center',
    maxWidth: '900px',
    lineHeight: 1.4,
    zIndex: 10,
    fontWeight: 400
  } as const,
  footer: {
    position: 'absolute',
    bottom: '50px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '30px',
    color: 'white',
    fontSize: '20px',
    zIndex: 10
  } as const,
  url: {
    fontWeight: 'bold'
  } as const
};
