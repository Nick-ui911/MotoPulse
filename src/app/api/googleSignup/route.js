export async function POST(req) {
  try {
    const { idToken, PhotoUrl } = await req.json();

    // Verify token
    const decoded = await adminAuth.verifyIdToken(idToken);
    const email = decoded?.email;
    const name = decoded?.name || decoded?.displayName || "Google User";

    if (!email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: { name, email, PhotoUrl },
      include: { bikes: true },
    });

    // Generate token and set cookie
    const token = signJwt({ email: user.email });
    
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ user, token }, { status: 200 });
    
  } catch (error) {
    console.error("Google signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}