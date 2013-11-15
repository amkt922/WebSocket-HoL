/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package jp.amkt922.cdis;

import javax.annotation.Resource;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.jms.JMSConnectionFactory;
import javax.jms.JMSContext;
import javax.jms.Topic;

/**
 *
 * @author p
 */
@Named(value = "indexManage")
@RequestScoped
public class IndexPageMgdBean {

    @Inject
    @JMSConnectionFactory("jms/topicCon")
    private JMSContext context;

    @Resource(mappedName = "jms/inforegtopic")
    private Topic topic;
    
    private String message;

    /**
     * Creates a new instance of IndexPageMgdBean
     */
    public IndexPageMgdBean() {
    }

    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    public String pushSendButton() {
        this.context.createProducer().send(topic, this.getMessage());
        return "";
    }
    
}
