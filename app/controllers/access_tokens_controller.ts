import User from "#models/user";
import { loginValidator } from "#validators/user";
import type { HttpContext } from "@adonisjs/core/http";
import UserTransformer from "#transformers/user_transformer";
export default class AccessTokensController {
  /**
   * Login : créer un token OAT après validation des données utilisateurs
   */
  async store({ request, serialize }: HttpContext) {
    // Validation de l'email et du mot de passe
    const { email, password } = await request.validateUsing(loginValidator);
    // Vérification qu'un utilisateur existe avec cet email et ce mot de passe
    // En cas d'échec, une erreur HTTP 400 est retournée automatiquement
    const user = await User.verifyCredentials(email, password);
    // Génération d'un token OAT
    const token = await User.accessTokens.create(user);
    // Retourne les infos utilisateurs et le token
    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    });
  }
  /**
   * Logout : supprimer le token OAT de l'utilisateur connecté
   */
  async destroy({ auth }: HttpContext) {
    // Récupère l'utilisateur connecté/authentifié
    const user = auth.getUserOrFail();
    // Supprime le token utilisé pour cette requête
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier);
    }
    return {
      message: "Logged out successfully",
    };
  }
}
