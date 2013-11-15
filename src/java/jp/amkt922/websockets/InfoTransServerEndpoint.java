/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package jp.amkt922.websockets;

import javax.ejb.EJB;
import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import jp.amkt922.ejbs.ClientManageSinglEJB;

/**
 *
 * @author p
 */
@ServerEndpoint("/infotrans")
public class InfoTransServerEndpoint {

    @EJB
    private ClientManageSinglEJB clManager;

    @OnOpen
    public void initOpen(Session session) {
        clManager.addClient(session);
    }

    @OnClose
    public void closeWebSocket(Session session) {
        clManager.removeClient(session);
    }
    
}
